import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  MAIL_ENCRYPTION,
} from "../config/config.js";

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blood Donation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #ffffff;
            padding: 20px;
            text-align: center;
            color: #2c0505;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .header h1 span {
            color: rgba(255, 0, 0, 0.83);
        }

        .content {
            padding: 20px;
            text-align: left;
            color: #333333;
        }

        .footer {
            background-color: #ff0000;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1><span>AZIM</span> E-Commerce 🩸</h1>
        </div>
        <div class="content">
            <h2>${EmailText}</h2>
            <p>Thank you for signing up for our service. We're excited to have you on board!</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company AZIM. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

export default EmailSend;
