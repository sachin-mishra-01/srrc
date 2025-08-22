// utils/sendOtp.js
import transporter from "../config/ndml.js";


export async function sndml (to , sub , txt) {
  const mailOptions = {
    from: `"SkillMintt..." <${process.env.MAIL_USER}>`,
    to,
    subject: sub,
    text: txt,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent!");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

