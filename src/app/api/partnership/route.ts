import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';
import { partnershipSchema } from '@/lib/validations';
import { z } from 'zod';

// Validate required environment variables at startup
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

// Initialize Resend only if API key is available
let resend: Resend | null = null;
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
} else {
  console.error('CRITICAL: RESEND_API_KEY environment variable is not set. Email functionality will be disabled.');
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    // Validate the request body
    let validatedData;
    try {
      validatedData = partnershipSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Invalid data provided', 
            details: validationError.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          { status: 400 }
        );
      }
      throw validationError;
    }
    
    // Generate unique ID for this inquiry
    const inquiryId = `partnership:${Date.now()}:${validatedData.email}`;
    const timestamp = new Date().toISOString();
    
    const inquiryData = {
      ...validatedData,
      timestamp,
      status: 'new',
    };
    
    // Store in Redis with proper error handling
    try {
      await kv.set(inquiryId, inquiryData);
      await kv.lpush('partnership:inquiries', inquiryId);
      await kv.incr('partnership:count');
    } catch (redisError) {
      console.error('Redis connection error:', redisError);
      return NextResponse.json(
        { 
          error: 'Database connection failed. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? String(redisError) : undefined
        },
        { status: 503 }
      );
    }
    
    // Send notification email to admin
    if (resend && NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: NOTIFICATION_EMAIL,
          subject: '🤝 New Partnership Inquiry - Prosthetic Companion',
          html: `
            <h2>New Partnership Inquiry</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Organization:</strong> ${validatedData.organization}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <hr />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${validatedData.message}
            </p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              This is an automated notification from your Prosthetic Companion website.
            </p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Continue - data is already saved, email is non-critical
      }
    } else {
      if (!resend) {
        console.warn('Skipping notification email: RESEND_API_KEY not configured');
      }
      if (!NOTIFICATION_EMAIL) {
        console.warn('Skipping notification email: NOTIFICATION_EMAIL not configured');
      }
    }
    
    // Send confirmation email to inquirer
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: validatedData.email,
          subject: 'Thank You for Your Partnership Inquiry',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Thank You for Your Interest</h1>
              <p>Hi ${validatedData.name},</p>
              <p>Thank you for reaching out to us at Prosthetic Companion. We've received your partnership inquiry and are excited to learn more about potential collaboration opportunities.</p>
              <p>Our team will review your message and get back to you within <strong>48 hours</strong>.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Your Inquiry Details:</h3>
                <p><strong>Organization:</strong> ${validatedData.organization}</p>
                <p><strong>Your Message:</strong></p>
                <p style="white-space: pre-wrap;">${validatedData.message}</p>
              </div>
              
              <p>If you have any additional information to share in the meantime, feel free to reply to this email.</p>
              
              <p>You can also connect with us on:</p>
              <ul>
                <li><a href="https://www.linkedin.com/in/johncbarr/">LinkedIn</a></li>
                <li><a href="https://x.com/farwalker3">X / Twitter</a></li>
              </ul>
              
              <p>Best regards,<br/>The Prosthetic Companion Team</p>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
              <p style="color: #999; font-size: 12px;">
                If you didn't submit this inquiry, please let us know by replying to this email.
              </p>
            </div>
          `,
        });
      } catch (confirmEmailError) {
        console.error('Failed to send confirmation email:', confirmEmailError);
        // Continue - inquiry has been recorded successfully
      }
    } else {
      console.warn('Skipping confirmation email: RESEND_API_KEY not configured');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Partnership inquiry submitted successfully',
      data: {
        name: validatedData.name,
        organization: validatedData.organization,
      }
    });
    
  } catch (error) {
    console.error('Partnership API error:', error);
    
    // Return generic error for unexpected issues
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
