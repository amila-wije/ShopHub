import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [Number],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shoe", shoeSchema);
