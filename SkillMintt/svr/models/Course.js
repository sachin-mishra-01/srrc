import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // original skill owner
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
