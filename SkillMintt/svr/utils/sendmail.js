// utils/sendOtp.js
import transporter from "../config/ndml.js";

export async function sndml(to, sub, txt) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.MAIL_USER,
    to,
    subject: sub,
    text: txt,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

   
    return { ok: true, messageId: info.messageId };
  } catch (error) {
  
    console.log("MAIL_FAILED_CODE:", error?.code || "NO_CODE");

  
    throw error;
  }
}
