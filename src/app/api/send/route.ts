// src/app/api/send/route.ts -- FINAL, COMPLETE & FULLY FUNCTIONAL VERSION
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Check for the API key at startup. If it's missing, the server will log a clear error.
if (!process.env.RESEND_API_KEY) {
  console.error("FATAL ERROR: RESEND_API_KEY environment variable is not set.");
}
const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema for strong, type-safe validation of the request body.
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'A valid email address is required.' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    // If validation fails, return a detailed error message.
    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(issue => issue.message).join(' ');
      return NextResponse.json({ error: `Invalid input: ${errorMessages}` }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    const { data, error } = await resend.emails.send({
      // CRITICAL: For new Resend accounts, the 'from' address MUST be 'onboarding@resend.dev'.
      from: 'Zain Khalid Portfolio <onboarding@resend.dev>',
      to: ['zain.nextdev@gmail.com'], // Your destination email address
      subject: `New Portfolio Message from ${name}`,
      replyTo: email, // Set the user's email as the reply-to address
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;"><h2>New Message via Portfolio</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><hr><h3>Message:</h3><p>${message.replace(/\n/g, '<br>')}</p></div>`,
    });

    // If Resend returns an error, forward its specific message.
    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // On success, return a success message.
    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error: any) {
    // Catch any other unexpected errors.
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}