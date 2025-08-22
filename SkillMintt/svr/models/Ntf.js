import mongoose from "mongoose";

const eNs = new mongoose.Schema({
  user: {            // user who sent the request
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillId: {         // skill requested
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  rSkillId: {        // skill offered by the sender
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  rUser: {           // owner of the target skill
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {          // request status
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true }); // to track createdAt & updatedAt

export default mongoose.model("Ntf", eNs);
