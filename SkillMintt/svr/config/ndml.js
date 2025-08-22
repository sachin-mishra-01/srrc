import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use "hotmail", "yahoo", etc.
  auth: {
    user: process.env.MAIL_USER, // your email
    pass: process.env.MAIL_PASS, // your app password
  },
});

export default transporter;