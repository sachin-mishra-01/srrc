
import Skill from "../models/Skill.js";
import Ntf from "../models/Ntf.js";
import User from  '../models/User.js';

import Course from "../models/Course.js";

export const exchangeSkill = async (req, res) => {
  try {
    const { skillId, exchangeWithId } = req.body;
    const userId = req.user._id;

    const mySkill = await Skill.findById(exchangeWithId);
    const targetSkill = await Skill.findById(skillId);

    if (!mySkill || !targetSkill) return res.status(404).json({ message: "Skill not found" });
   
    // Save exchange transaction
   const notification = await Ntf.create({
  user: userId,         // the user who is sending the request
  rUser: targetSkill.user, // the owner of the skill you want to exchange
  skillId: skillId,     // the skill you want from the other user
  rSkillId: exchangeWithId, // the skill you are offering
  status: "pending"     // initial status
    });

    await User.findByIdAndUpdate(targetSkill.user, {
  $push: { exns: notification._id }
      });

      await User.findByIdAndUpdate(mySkill.user, {
  $push: { exns: notification._id }
});



    res.json({ success: true, message: "Exchange request successful", notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// controllers/exchangeController.js



export const acceptRequest = async (req, res) => {
  try {
    const { ntfId } = req.body;
    const accepterId = req.user._id; // logged-in (target) user

    const ntf = await Ntf.findById(ntfId)
      .populate("skillId")   // target skill (belongs to accepter)
      .populate("rSkillId")  // offered skill (belongs to requester)
      .populate("user");     // requester user

    if (!ntf) return res.status(404).json({ message: "Request not found" });

    // Only the owner of target skill can accept
    if (ntf.skillId.user.toString() !== accepterId.toString()) {
      return res.status(403).json({ message: "Not authorized to accept this request" });
    }

    // Create courses
    const requesterCourse = await Course.create({
      skill: ntf.skillId._id,          // requester gets target skill
      owner: ntf.skillId.user,         // owner of that skill (accepter)
    });

    const accepterCourse = await Course.create({
      skill: ntf.rSkillId._id,         // accepter gets offered skill
      owner: ntf.rSkillId.user,        // owner of that skill (requester)
    });

    // Push into users' courses arrays
    await User.findByIdAndUpdate(ntf.user._id, {
      $addToSet: { courses: requesterCourse._id }
    });

    await User.findByIdAndUpdate(accepterId, {
      $addToSet: { courses: accepterCourse._id }
    });

    
     ntf.status = "accepted"; // (make sure your schema has a status field)
    await ntf.save();
    // Cleanup the notification (since you don't keep status)
    //await Ntf.findByIdAndDelete(ntfId);

    res.json({
      message: "Exchange accepted",
      requesterCourseId: requesterCourse._id,
      accepterCourseId: accepterCourse._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { ntfId } = req.body;
    const userId = req.user._id;

    const ntf = await Ntf.findById(ntfId).populate("skillId");
    if (!ntf) return res.status(404).json({ message: "Request not found" });

    // Only the target user can reject
    if (ntf.skillId.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to reject this request" });
    }
          ntf.status = "rejected"; // (make sure your schema has a status field)
    await ntf.save(); 
        
    //await Ntf.findByIdAndDelete(ntfId);
    res.json({ message: "Request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
