import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    shoeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shoe",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", ratingSchema);
