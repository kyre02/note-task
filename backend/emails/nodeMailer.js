import nodemailer from 'nodemailer';
import env from 'dotenv';


env.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const sendEmail = (mailOptions) => {
  return new Promise ((resolve, reject) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      reject(error);
    } else {
      console.log('Email sent:', info.response);
      resolve(info);
    }
  });
  });
};

