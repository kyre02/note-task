import User from '../models/user.db.js';
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from '../utilities/generateToken.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../emails/email.js';


//sign up
export const signup = async (req, res) => {
  const {name, email, password} = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({error: "All fields are required"});
    }
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({error: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
    });
    await user.save();

    //jwt
    generateToken(res, user._id);

    //send verification email
    await sendVerificationEmail(user.email, verificationToken, user.name);

    //return response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
          ...user._doc,
          password: undefined
      }
  });

  } catch (error) {
    res.status(400).json({success: false, error: error.message});
}
};


//verify email
export const verifyEmail = async(req, res) => {
  const {code} = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    });

    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or expired verification code"});
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {...user._doc, password: undefined}
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({success: false, message: error.message});
  }
};

//login
export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
      if (!email) {
          return res.status(400).json({error: "Email is required"});
      }
      if (!password) {
          return res.status(400).json({error: "Password is required"});
      }
      const user = await User.findOne({email});
      if (!user) {
          return res.status(400).json({error: "User not found"});

      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({success: false, error: "Invalid Password"});
      }

      //jwt
      generateToken(res, user._id);

      res.status(200).json({success: true, message: "Logged in successfully",
          user: {...user._doc, password: undefined}
      });
  } catch (error) {
      console.log(error);
      res.status(400).json({success: false, error: error.message});
  }
};

//logout
export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success: true, message: "Logged out successfully"});
};

//Forgot Password
export const forgotPassword = async (req, res) => {
  const {email} = req.body;
  try {
      const user = await User.findOne({email});
      if (!user) {
          return res.status(400).json({success: false, error: "User not found"});

      }else {

      //generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = resetTokenExpiresAt;
      await user.save();

      await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`, user.name);
      res.status(200).json({success: true, message: "Password reset email sent successfully"});
  }

  } catch (error) {
      res.status(400).json({success: false, error: error.message});
  }
};


//reset password api
export const resetPassword = async (req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpiresAt: { $gt: Date.now() },
      });
      if (!user) {
          return res.status(400).json({success: false, error: "Invalid or expired reset token"});
      }

      //update the passoword
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();

      await sendResetSuccessEmail(user.email, user.name);
      res.status(200).json({success: true, message: "Password reset successfully"});
  
  } catch (error) {
      console.log(error);
      res.status(400).json({success: false, error: error.message});
  }
};

//check auth api
export const checkAuth = async (req, res) => {
  try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
          return res.status(400).json({success: false, message: "User not found"});
      }
      res.status(200).json({success: true, user: {
          ...user._doc,
          password: undefined
      }});
  }catch (error) {
      console.log(error);
      res.status(400).json({success: false, message: error.message});
  }
};

export const validateResetToken = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid or expired reset token" });
    }

    res.status(200).json({ success: true, message: "Valid token" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//show users
export const getUser = async (req, res) => {
  try {
    const user =req.user;

    if (!user) {
      return res.status(400).json({ success: false, error: "User not authenticated" });
    }
    
    const isUser = await User.findById(user._id);
    if (!isUser) {
        return res.status(400).json({success: false, error: "User not found"});
    }
    return res.json({
        user: {
            name: isUser.name, 
            email: isUser.email, 
            _id: isUser._id, 
            createdOn: isUser.createdOn,
        },
        message: "User found"
      })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

 
};
