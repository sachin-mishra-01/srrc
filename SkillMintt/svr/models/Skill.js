import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    media: {
      url: { type: String, required: true },
      type: { type: String, enum: ["image", "video", "pdf"], required: true },
    },
    thumbnail: { type: String, default: "" },

    // Rating fields
    ratingScore: { type: Number, default: 0 }, // average rating (1-5)
    ratings: { type: Number, default: 0 },
    userRatings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
      },
    ],     // total number of ratings
  },
  { timestamps: true }
);

skillSchema.index({ tags: 1, name: 1 });

export default mongoose.model("Skill", skillSchema);
