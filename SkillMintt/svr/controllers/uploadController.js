import bcrypt from "bcrypt";
import User from '../models/User.js'
import Skill from '../models/Skill.js'
import cloudinary from "../config/cld.js"
import jwt from "jsonwebtoken";
//import cloudinary from "../config/cld.js";
export const Profileu = async (req,res) =>{
  try {
    const url = req.file.path;
    const pubid = req.file.filename;
    
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
      
       
        
        const pfdata = await User.findOneAndUpdate(
      { username:id },
      { 
        profilePhoto: url,
        //profilePhotoPublicId: publicId
      },
      { new: true } // return updated document
    );

    res.json({ message: "Profile photo updated", user: pfdata });

    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
}


export const Profilech = async (req,res) =>{
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
      
       
        
        const pfdata = await User.findOneAndUpdate(
      { username:id },
      { 
        profilePhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png" ,
        //profilePhotoPublicId: publicId
      },
      { new: true } // return updated document
    );

    res.json({ message: "Profile photo updated", user: pfdata });

    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
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
      
       const { name, description, price, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
        
        const pfdata = await Skill.create({
      user: req.user._id,
      name,
      description,
      price,
      tags: tags.split(",").map((t) => t.trim()),
      media: [
        {
          url: req.file.path, // cloudinary or local
          type: req.file.mimetype.includes("image")
            ? "image"
            : req.file.mimetype.includes("video")
            ? "video"
            : "pdf",
        },
      ],
    });

   const pdata =  await User.findByIdAndUpdate(req.user._id, {
      $push: { skills: pfdata._id }
    });

    res.json({ message: "Profile photo updated", user: pdata });

    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
}










// skillsetController.js

export const Skillset = async (req, res) => {
  try {
    const tkn = req.cookies.tkn;
    const { name, description, price, tags } = req.body;

    if (!tkn) return res.status(401).json({ message: "Unauthorized" });

    const userData = jwt.verify(tkn, process.env.JWT_SECRET);
    if (!userData) return res.status(401).json({ message: "Invalid token" });

    // ✅ FIX: use userData.id instead of userData._id
    const user = await User.findById(userData.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) return res.status(400).json({ message: "File is required" });
    if (!name || !description || !price || !tags)
      return res.status(400).json({ message: "All fields are required" });

    const resourceType = req.file.mimetype.includes("image")
      ? "image"
      : req.file.mimetype.includes("video")
      ? "video"
      : "pdf";

    const fileUrl = req.file.path;
     const thumbnail =  "https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?cs=srgb&dl=pexels-codioful-6985001.jpg&fm=jpg";

    const skill = await Skill.create({
      user: user._id,
      name,
      description,
      price,
      tags: tags.split(/[\s,]+/).filter((t) => t),
      media: { url: fileUrl, type: resourceType, filename: req.file.originalname },
      thumbnail,
    });

    user.skills.push(skill._id);
    await user.save();

    res.status(201).json({ message: "Skill uploaded successfully", skill });
  } catch (err) {
    console.error("Skill upload error:", err);
    res.status(500).json({ error: err.message });
  }
};










// mdaController.js


const sanitizeFilename = (name) =>
  name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_]/g, "");



export const Mda = async (req, res) => {
  try {
    const { skillId } = req.body;
    const tkn = req.cookies.tkn;

    if (!skillId || !tkn) return res.status(401).json({ message: "Unauthorized" });

    const userData = jwt.verify(tkn, process.env.JWT_SECRET);
    if (!userData) return res.status(401).json({ message: "Invalid token" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Determine media type
    const mime = req.file.mimetype;
    let mediaType = "";
    if (mime.startsWith("image/")) mediaType = "image";
    else if (mime.startsWith("video/")) mediaType = "video";
    else if (mime === "application/pdf") mediaType = "pdf";
    else return res.status(400).json({ message: "Unsupported file type" });

    // Cloudinary URL
    const mediaUrl = req.file.path; 

    // Sanitize filename
    const filename = sanitizeFilename(req.file.originalname.split(".")[0]) + "." + req.file.originalname.split(".").pop();

    // Update skill in DB
    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      {
        media: { url: mediaUrl, type: mediaType, filename },
      },
      { new: true }
    );

    if (!updatedSkill) return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill media uploaded successfully", skill: updatedSkill });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};





export const Update = async (req, res) => {
  try {
    const tkn = req.cookies.tkn;
    const { un, username, fullname, bio ,id , needs } = req.body;
   
      if (!un || !fullname || !username) {
  return res.status(400).json({ message: "Missing required fields" });
}
    if (!un && !tkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let usnm = "";
    if (!tkn) {
      usnm = un;
       const xx = await User.findOne({ usnm });
       id = xx._id;
    } else {
      const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
      usnm = decoded.username;
      if(!id ){
        id = decoded.id;
      }
    }

    // Find the user from username

    const us = await User.findOne({ username , _id: { $ne: id }  });
    if (us ) {
      return res.status(404).json({ message: "User name alredy  exist" });
    }


    const user = await User.findOneAndUpdate(
      { username: usnm }, // find by current username
      { fullname, username, bio , needs},
      { new: true } // return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    
    
    // Validate required fields
  

   

    res.status(201).json({ message: "user updated", user });
  } catch (err) {
    console.error("user update error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const Updatepwd = async (req, res) => {
  try {
    const tkn = req.cookies.tkn;
    const { un , password } = req.body;
   //
      if ( !password) {
  return res.status(400).json({ message: "Missing required fields" });
}
    if (!un && !tkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let usnm = "";
    if (!tkn) {
      usnm = un;
       
    } else {
      const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
      usnm = decoded.username;
      
    }

    // Find the user from username
  const hashedPassword = await bcrypt.hash(password, 10);
   const user = await User.findOne({ username:usnm });
     if (!user) {
      return res.status(404).json({ message: "User not foud" });
    }
  user.password = hashedPassword;
  await user.save();

    

    

    
    
    
    // Validate required fields
  

   

    res.status(201).json({ message: "password updated", user });
  } catch (err) {
    console.error("password update error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const Thmb = async (req, res) => {
  try {
    // 1️⃣ Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = req.file.path;
    const pubid = req.file.filename;

    // 2️⃣ Check for skillId and token
    const tkn = req.cookies.tkn;
    const { skillId } = req.body;
    if (!skillId || !tkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 3️⃣ Verify token
    let pf;
    try {
      pf = jwt.verify(tkn, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 4️⃣ Update skill thumbnail
    const skdata = await Skill.findOneAndUpdate(
      { _id: skillId },
      { thumbnail: url },
      { new: true }
    );

    if (!skdata) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // 5️⃣ Respond with updated skill
    res.json({ message: "Thumbnail updated", skdata });
  } catch (err) {
    console.error("Thumbnail update error:", err);
    res.status(500).json({ message: err.message });
  }
};


const getMediaType = (mimetype) => {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype === "application/pdf") return "pdf";
  return "unknown";
};





export const Updsk = async (req, res) => {
  try {
    const tkn = req.cookies.tkn;
    const { skillId,
          title,
          description,
          price,
          tags } = req.body;
   
      if (!title||
          !description||
          !price||
          !tags) {
  return res.status(400).json({ message: "Missing required fields" });
}
    if (!skillId && !tkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    
    

    // Find the user from username

    


   const skill = await Skill.findOneAndUpdate(
      { _id: skillId,  },
      {
        name: title,
        description,
        price,
        tags,
      },
      { new: true }
    );


    if (!skill) {
      return res.status(404).json({ message: "skill not found" });
    }

    
    
    
    // Validate required fields
  

   

    res.status(201).json({ message: "skill updated", skill });
  } catch (err) {
    console.error("skill error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const dsk = async (req, res) => {
  try {
    const { skillId } = req.body;
    const tkn = req.cookies.tkn;

    if (!skillId || !tkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode JWT to get user ID
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the skill
    const skill = await Skill.findOne({ _id: skillId, user: userId });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Optional: Delete media from Cloudinary
    if (skill.media?.url) {
      try {
        const publicId = skill.media.url
          .split("/")
          .slice(-1)[0]
          .split(".")[0]; // basic extraction, adjust if needed

        await cloudinary.uploader.destroy(publicId, {
          resource_type: skill.media.type === "pdf" ? "raw" : "auto",
        });
      } catch (err) {
        console.warn("Cloudinary deletion failed:", err.message);
      }
    }

    // Delete skill
    await Skill.deleteOne({ _id: skillId });

    // Remove from user's skills array
    await User.findByIdAndUpdate(userId, { $pull: { skills: skillId } });

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Delete skill error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const Rt= async (req, res) => {
  try {
    const { skillId, rating } = req.body;
    const userId = req.user._id;

    if (!skillId || !rating) return res.status(400).json({ message: "Skill ID and rating required" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });

    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Check if user has already rated
    const existingRating = skill.userRatings.find((r) => r.user.toString() === userId.toString());

    if (existingRating) {
      // Update previous rating
      existingRating.rating = rating;
    } else {
      // Add new rating
      skill.userRatings.push({ user: userId, rating });
    }

    // Recalculate average and total ratings
    skill.ratings = skill.userRatings.length;
    skill.ratingScore = skill.userRatings.reduce((sum, r) => sum + r.rating, 0) / skill.ratings;

    await skill.save();

    res.status(200).json({
      message: "Rating submitted",
      ratingScore: skill.ratingScore,
      ratings: skill.ratings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
