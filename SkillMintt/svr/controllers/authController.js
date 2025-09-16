import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { gentkn } from "../utils/gentkn.js";
import jwt from "jsonwebtoken";
import { sndml } from "../utils/sendmail.js";



// Signup
export const signup = async (req, res) => {
  try {
    const {fullname, username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword
    });

    // Send JWT
  const tkn = gentkn(user._id , user.username);

   res.cookie("tkn", tkn, {
  httpOnly: true,
  secure: true,        // must be true in production (Vercel uses HTTPS)
  sameSite: "none",    // allow cross-site cookies
  maxAge: 24 * 60 * 60 * 1000,
});


    res.status(201).json({
      message: "Account created successfully",
      username: user.username,
      tkn,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { login , password } = req.body;

    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid username/email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username/email or password" });
    }

  const tkn = gentkn(user._id , user.username);
  

  res.cookie("tkn", tkn, {
  httpOnly: true,
  secure: true,        // must be true in production (Vercel uses HTTPS)
  sameSite: "none",    // allow cross-site cookies
  maxAge: 24 * 60 * 60 * 1000,
});

    
  
    // Create JWT token
   

    // Optionally send cookie or token in response
    res.status(200).json({
      message: "Login successful",
      tkn,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("tkn", {
    httpOnly: true,
    path: "/",       
    sameSite: "lax", 
    secure: false,  
     maxAge: 0,        
  });
  return res.status(200).json({ message: "Logged out successfully" });
};


export const rOtp = async (req, res) => {
  try {
    const { login } = req.body; // login can be email OR username

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    user.otp = { code, expiresAt };
    await user.save();

    // send the OTP to user email
    await sndml(
      user.email,
      "Your SkillMintt... OTP",
      `Your OTP is ${code}. It expires in 2 minutes.`
    );

    res.json({ message: "OTP sent to your email" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};


export const vOtp = async (req, res) => {
  try {
    const { login, otp } = req.body;

    // 1. Find user by email/username
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!user || !user.otp)
      return res.status(400).json({ message: "OTP not requested" });

    // 2. Check expiry
    if (Date.now() > new Date(user.otp.expiresAt).getTime()) {
      user.otp = null;
      await user.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    // 3. Compare entered OTP with saved OTP
    const enteredOtp = otp.toString(); // ✅ correct conversion
    
    
    if (enteredOtp != user.otp.code) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 4. Success → clear OTP
    user.otp = null;
    await user.save();

    // 5. Issue JWT cookie
    const tkn = gentkn(user._id, user.username);

    res.cookie("tkn", tkn, {
      httpOnly: true,
       secure: true,        // must be true in production (Vercel uses HTTPS)
       sameSite: "none",    // allow cross-site cookies
       maxAge: 24 * 60 * 60 * 1000,
     
    });

    res.json({ success: true, username: user.username });
  } catch (e) {
    console.error("OTP Verify Error:", e);
    res.status(500).json({ message: "Server error" });
  }
};

