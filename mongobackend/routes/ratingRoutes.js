import express from "express";
import Rating from "../models/Rating.js";
import Shoe from "../models/Shoe.js";

const router = express.Router();

// Add rating
router.post("/", async (req, res) => {
  try {
    const { shoeId, rating } = req.body;

    // Save rating
    const newRating = await Rating.create(req.body);

    // Update average rating
    const allRatings = await Rating.find({ shoeId });

    const avg =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await Shoe.findByIdAndUpdate(shoeId, {
      averageRating: avg,
    });

    res.json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ratings = await Rating.find({ shoeId: req.params.id });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    if (!rating) return res.status(404).json({ message: "Rating not found" });

    res.json({ message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
