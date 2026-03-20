import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token) {
  const { data, error } = await resend.emails.send({
    from: 'DeForm <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email',
    html: `
      <p>Thanks for signing up!</p>
      <p>Copy and paste this code to verify your email:</p>
      <pre style="font-size:18px;letter-spacing:4px;background:#f4f4f4;padding:12px 20px;border-radius:6px;">${token}</pre>
      <p>This code expires in 24 hours.</p>
    `,
  });

  console.log('Resend data:', data);
  console.log('Resend error:', error);
}