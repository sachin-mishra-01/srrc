import Skill from "../models/skillModel.js";

export const getFeed = async (req, res) => {
  try {
    // Fetch 20 random skills
    const skills = await Skill.aggregate([
      { $sample: { size: 20 } },  // random 20 docs
      {
        $lookup: {
          from: "users", // collection name in MongoDB
          localField: "user",
          foreignField: "_id",
          as: "owner"
        }
      },
      { $unwind: "$owner" }, // Convert owner array -> object
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          tags: 1,
          media: 1,
          thumbnail: 1,
          "owner._id": 1,
          "owner.username": 1,
          "owner.fullname": 1,
          "owner.profilePhoto": 1
        }
      }
    ]);

    res.json({ success: true, skills });
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
