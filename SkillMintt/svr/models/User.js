import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sndml } from "../utils/sendmail.js";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    profilePhoto: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    bio: { type: String, default: "" },
    needs: { type: String, default: "" },

    exns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ntf" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

    otp: {
      code: { type: String, default: null },
      expiresAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);




userSchema.post("save", function (doc) {
 
  if (!doc.wasNew) return;

 
  sndml(doc.email, "Account Creation Notification", "Welcome to SkillMintt...")
    .then(() => console.log("✅ Welcome email sent to user "))
    .catch((err) => console.log("Sorry for ❌ Welcome email failed to user"));
});


userSchema.pre("save", function (next) {
  
  this.wasNew = this.isNew;
  next();
});

export default mongoose.model("User", userSchema);
