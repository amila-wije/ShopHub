import express from "express";
import Shoe from "../models/Shoe.js";
import Rating from "../models/Rating.js";

const router = express.Router();

// Create shoe
router.post("/", async (req, res) => {
  try {
    const shoe = await Shoe.create(req.body);
    res.json(shoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all shoes with average ratings
router.get("/", async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single shoe + all ratings
router.get("/:id", async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });

    const ratings = await Rating.find({ shoeId: req.params.id });

    res.json({ shoe, ratings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete shoe + its ratings
router.delete("/:id", async (req, res) => {
  try {
    const shoeId = req.params.id;

    const [shoe] = await Promise.all([
      Shoe.findByIdAndDelete(shoeId),
      Rating.deleteMany({ shoeId }),
    ]);

    if (!shoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.json({ message: "Shoe and ratings deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
