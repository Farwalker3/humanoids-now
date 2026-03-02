import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';
import { partnershipSchema } from '@/lib/validations';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = partnershipSchema.parse(body);
    
    // Generate unique ID for this inquiry
    const inquiryId = `partnership:${Date.now()}:${validatedData.email}`;
    const timestamp = new Date().toISOString();
    
    // Store in Vercel KV
    await kv.set(inquiryId, {
      ...validatedData,
      timestamp,
      status: 'new',
    });
    
    // Add to partnership inquiries list
    await kv.lpush('partnership:inquiries', inquiryId);
    
    // Increment partnership counter
    await kv.incr('partnership:count');
    
    // Send notification email to admin
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    if (notificationEmail) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
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
        // Continue even if email fails - data is already saved
      }
    }
    
    // Send confirmation email to inquirer
    try {
      await resend.emails.send({
        from: fromEmail,
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
      // Continue even if confirmation email fails
    }
    
    return NextResponse.json({
      success: true,
      message: 'Partnership inquiry submitted successfully',
    });
    
  } catch (error) {
    console.error('Partnership API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data provided', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
