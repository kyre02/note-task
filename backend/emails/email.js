import {VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from './emailTemplate.js';
import {sendEmail} from './nodeMailer.js';

//Verification Email
export const sendVerificationEmail = async(email, verificationToken ,name) => {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken).replace("{name}", name)
    };

    try {
      const response = await sendEmail(mailOptions);
      console.log("Email sent successfully", response);
    } catch (error) {
      console.log("Error sending verfication email", error);
      throw new Error(`Error sending verification email: ${error.message}`);
    }
};

//Welcome Email
export const sendWelcomeEmail = async(email, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to NOTETASK',
    html: WELCOME_EMAIL.replace("{name}", name)
  };

  try {
    const response = await sendEmail(mailOptions);
    console.log("Email sent successfully", response);

  } catch (error) {
    console.log("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

//Forgot Password Email
export const sendPasswordResetEmail = async(email, resetURL, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{name}", name).replace("{resetURL}", resetURL)
  };
  try {
    const response = await sendEmail(mailOptions);
    console.log("Email sent successfully", response);

  } catch (error) {
    console.log("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

//reset successful
export const sendResetSuccessEmail = async(email, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Password reset successful',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}", name)
  };
  try {
    const response = await sendEmail(mailOptions);
    console.log("Email sent successfully", response);

  } catch (error) {
    console.log("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
}