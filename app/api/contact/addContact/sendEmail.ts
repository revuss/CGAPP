import nodemailer from "nodemailer";

export const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const generateEmailTemplate = ({
  name,
  email,
  phoneNumber,
  message,
}: {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => `
   <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #444;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: #007BFF;
        color: #fff;
        text-align: center;
        padding: 16px;
        font-size: 20px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        color: #007BFF;
        margin-top: 0;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.5;
      }
      .content .label {
        font-weight: bold;
        color: #333;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background: #f8f8f8;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        Contact Form Submission
      </div>
      <div class="content">
        <h2>Details:</h2>
        <p><span class="label">Name:</span> ${name}</p>
        <p><span class="label">Email:</span> ${email}</p>
        <p><span class="label">Phone Number:</span> ${phoneNumber}</p>
        <p><span class="label">Message:</span> ${message}</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} CytoGenesis. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;

export const sendEmail = async ({
  to,
  subject,
  template,
}: {
  to: string[];
  subject: string;
  template: string;
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: template,
  };

  return transporter.sendMail(mailOptions);
};
