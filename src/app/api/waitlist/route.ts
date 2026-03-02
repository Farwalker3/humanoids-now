import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';
import { waitlistSchema } from '@/lib/validations';
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
      validatedData = waitlistSchema.parse(body);
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
    
    // Check Vercel KV connection and existing entry
    let existingEntry;
    try {
      existingEntry = await kv.get(`waitlist:${validatedData.email}`);
    } catch (kvError) {
      console.error('Vercel KV connection error:', kvError);
      return NextResponse.json(
        { 
          error: 'Database connection failed. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? String(kvError) : undefined
        },
        { status: 503 }
      );
    }
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }
    
    // Store in Vercel KV with timestamp
    const timestamp = new Date().toISOString();
    const waitlistData = {
      email: validatedData.email,
      name: validatedData.name || null,
      timestamp,
    };
    
    try {
      await kv.set(`waitlist:${validatedData.email}`, waitlistData);
      await kv.incr('waitlist:count');
    } catch (kvError) {
      console.error('Failed to save to Vercel KV:', kvError);
      return NextResponse.json(
        { 
          error: 'Failed to save your information. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? String(kvError) : undefined
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
          subject: '🎉 New Waitlist Signup - Prosthetic Companion',
          html: `
            <h2>New Waitlist Signup</h2>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.name ? `<p><strong>Name:</strong> ${validatedData.name}</p>` : ''}
            <p><strong>Timestamp:</strong> ${timestamp}</p>
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
    
    // Send confirmation email to user (optional)
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: validatedData.email,
          subject: 'Welcome to the Prosthetic Companion Waitlist',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Welcome to the Waitlist!</h1>
              ${validatedData.name ? `<p>Hi ${validatedData.name},</p>` : '<p>Hi there,</p>'}
              <p>Thank you for joining the waitlist for Prosthetic Companion. You're among the first to hear about our revolutionary approach to human-robot collaboration.</p>
              <p>We'll keep you updated on our progress and let you know when early access becomes available.</p>
              <p>In the meantime, feel free to connect with us:</p>
              <ul>
                <li><a href="https://www.linkedin.com/in/johncbarr/">LinkedIn</a></li>
                <li><a href="https://x.com/farwalker3">X / Twitter</a></li>
              </ul>
              <p>Best regards,<br/>The Prosthetic Companion Team</p>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
              <p style="color: #999; font-size: 12px;">
                If you didn't sign up for this waitlist, you can safely ignore this email.
              </p>
            </div>
          `,
        });
      } catch (confirmEmailError) {
        console.error('Failed to send confirmation email:', confirmEmailError);
        // Continue - user has been added to waitlist successfully
      }
    } else {
      console.warn('Skipping confirmation email: RESEND_API_KEY not configured');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
    });
    
  } catch (error) {
    console.error('Waitlist API error:', error);
    
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
