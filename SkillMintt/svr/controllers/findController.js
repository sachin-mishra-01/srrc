import User from "../models/User.js";
import Skill from "../models/Skill.js";
import Course from "../models/Course.js";
import Ntf from "../models/Ntf.js";

import bcrypt from "bcryptjs";
import { gentkn } from "../utils/gentkn.js";
import jwt from "jsonwebtoken";



// Signup
export const fuser = async (req, res) => {
  try {
   
    const tkn = req.cookies.tkn;
   const {un} = req.body;
   // const tkn = un;
    if(!un && !tkn) return res.status(401).json({message:"Unauthorized"});
   let id = "";
   if(!tkn){
    
    id = un;
   }else{
    const pf = jwt.verify(tkn,process.env.JWT_SECRET);
    id = pf.username;
   }
  
   
    
   
         const pfdata = await User.findOne({ username: id })
  .populate({ path: "skills" }) // user’s own skills
  .populate({
    path: "exns",   // notifications stored in user
    populate: [
      { path: "user" },        // sender full info
      { path: "rUser" },       // receiver full info
      { path: "skillId" },     // target skill
      { path: "rSkillId" }     // offered skill
    ]
  })
  .populate({
    path: "courses",
    populate: [
      { path: "skill" },  // populate the skill inside course
      { path: "owner" }   // populate original skill owner
    ]
  });



    
    if (!pfdata) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
       pfdata,
      
    })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fskill = async (req, res) => {
  try {
   
    const tkn = req.cookies.tkn;
   const {skillId} = req.body;
   // const tkn = un;
    if(!skillId || !tkn) return res.status(401).json({message:"Unauthorized"});
   let id = "";
   
    const pf = jwt.verify(tkn,process.env.JWT_SECRET);
    id = pf.username;
   
    

       
   
   
   const skdata = await Skill.findOne({ _id: skillId }).populate("user", "username _id");
  


    
    if (!skdata) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json({
       skdata,
      
    })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




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
          as: "user"
        }
      },
      { $unwind: "$user" }, // Convert owner array -> object
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          tags: 1,
          media: 1,
          thumbnail: 1,
          ratingScore: 1, // average rating
          ratings: 1,     // total ratings count
          "user._id": 1,
          "user.username": 1,
          "user.fullname": 1,
          "user.profilePhoto": 1
        }
      }
    ]);

    res.json({ success: true, skills });
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getExns = async (req, res) => {
  try {
    // get token
    const token = req.cookies.tkn ;
    if (!token) return res.status(401).json({ message: "No token provided" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // find user and populate exchange notifications
    const user = await User.findById(userId)
      .populate({
        path: "exns",
        populate: [
          { path: "user", select: "fullname username profilePhoto" },  // sender
          { path: "rUser", select: "fullname username profilePhoto" }, // receiver
          { path: "skillId" },  // requested skill
          { path: "rSkillId" }  // offered skill
        ]
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ ntfs: user.exns });
  } catch (err) {
    console.error("getNotifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getExnsdtl = async (req, res) => {
  try {
    const { ntfId } = req.body;
    if (!ntfId) return res.status(400).json({ message: "ntfId required" });

    const ntf = await Ntf.findById(ntfId)
      .populate("user", "fullname username profilePhoto")
      .populate("rUser", "fullname username profilePhoto")
      .populate("skillId")
      .populate("rSkillId");

    if (!ntf) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ ntf });
  } catch (err) {
    console.error("Error fetching ntf detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCources = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT/session

    const user = await User.findById(userId).populate({
      path: "courses",
      populate: [
        {
          path: "skill",
          select: "name description thumbnail media price tags rating"
        },
        {
          path: "owner",
          select: "fullname username profilePhoto"
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getCrsdtl = async (req, res) => {
  try {
    
    const { courseId } = req.body;

    const course = await Course.findById(courseId)
      .populate("owner", "fullname username profilePhoto")  // only needed fields from owner
      .populate("skill"); // full skill details

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};






export const getSch = async (req, res) => {
  try {
    const { search, mode, minRating } = req.body;

    if (!search || !mode) {
      return res.status(400).json({ message: "Search text and mode required" });
    }

    if (mode === "user") {
      // Exact fullname match (case-insensitive)
      const users = await User.find({
        fullname: { $regex:  search, $options: "i" }
      }).select("fullname username profilePhoto skills");

      return res.json({ users });
    }

    if (mode === "skill") {
      // Match either tag or name (title) + rating filter
      //let searchWords = search.trim().split(/\s+/);
      const filter = {
  $or: [
    { tags: { $in: search.trim().split(/\s+/) } },            // match any tag
    { name: { $regex: search, $options: "i" } }        // match title starting with search
  ],
  ratingScore: { $gte: minRating || 0 }
};

      const skills = await Skill.find(filter)
        .populate("user", "username fullname profilePhoto");

      return res.json({ skills });
    }

    res.status(400).json({ message: "Invalid search mode" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const fus = async (req, res) => {
  try {
   
    //const tkn = req.cookies.tkn;
   const un = req.body.uusername;
   // const tkn = un;
    if(!un ) return res.status(401).json({message:"Unauthorized"});
   
    
   const id = un;
   
  
   
    
   
         const pfdata = await User.findOne({ username: id })
  .populate({ path: "skills" }) // user’s own skills
  .populate({
    path: "exns",   // notifications stored in user
    populate: [
      { path: "user" },        // sender full info
      { path: "rUser" },       // receiver full info
      { path: "skillId" },     // target skill
      { path: "rSkillId" }     // offered skill
    ]
  });



    
    if (!pfdata) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
       pfdata,
      
    })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
