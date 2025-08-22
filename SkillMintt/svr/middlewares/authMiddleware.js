import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Read token from cookie
   
    const token = req.cookies?.tkn;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // now req.user can be used in any protected route
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ success: false, message: "Not authorized, token invalid" });
  }
};
