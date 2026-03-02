import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';
import { waitlistSchema } from '@/lib/validations';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = waitlistSchema.parse(body);
    
    // Check if email already exists in waitlist
    const existingEntry = await kv.get(`waitlist:${validatedData.email}`);
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }
    
    // Store in Vercel KV with timestamp
    const timestamp = new Date().toISOString();
    await kv.set(`waitlist:${validatedData.email}`, {
      email: validatedData.email,
      name: validatedData.name || null,
      timestamp,
    });
    
    // Increment waitlist counter
    await kv.incr('waitlist:count');
    
    // Send notification email to admin
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    if (notificationEmail) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
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
        // Continue even if email fails - data is already saved
      }
    }
    
    // Send confirmation email to user (optional)
    try {
      await resend.emails.send({
        from: fromEmail,
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
      // Continue even if confirmation email fails
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
    });
    
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data provided', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}
