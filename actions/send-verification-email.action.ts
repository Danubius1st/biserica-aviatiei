import { Resend } from 'resend';

import {
  ANSI_code_Reset,
  ANSI_style_1
} from '@/config/ANSI-codes';

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER as string;

const styles = {
  container:
    'max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;',
  heading: 'font-size:20px;color:#333;',
  paragraph: 'font-size:16px;',
  link: 'display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;',
};

export const sendVerificationEmailAction = async ({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) => {
  const mailOptions = {
    from: sender,
    to,
    subject: 'Studiind biblia - Confirm your email',
    html: `
    <div style='${styles.container}'>
      <h1 style='${styles.heading}'>${subject}</h1>
      <p style='${styles.paragraph}'>${meta.description}</p>
      <a href='${meta.link}' style='${styles.link}'>Click Here</a>
    </div>
    `,
  };

  console.log(`${ANSI_style_1}sendVerificationEmailAction${ANSI_code_Reset}:\nlink: ${meta.link}`);

  await resend.emails.send(mailOptions);
};
