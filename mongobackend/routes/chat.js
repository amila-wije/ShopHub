import express from "express";
import OpenAI from "openai";
import Shoe from "../models/Shoe.js";
import Rating from "../models/Rating.js";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    //Extract filters
    const aiExtract = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Extract filters and return ONLY JSON:

{
  "brand": string | null,
  "maxPrice": number | null,
  "size": number | null,
  "minRating": number | null
}
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    let raw = aiExtract.choices[0].message.content;
    console.log("RAW:", raw);

    let filters;
    try {
      filters = JSON.parse(raw);
    } catch {
      return res.json({ reply: "Couldn't understand your request." });
    }

    // Mongo query
    const query = {};

    if (filters.brand) query.brand = new RegExp(filters.brand, "i");
    if (filters.maxPrice) query.price = { $lte: filters.maxPrice };
    if (filters.size) query.sizes = filters.size;

    const shoes = await Shoe.find(query).limit(5);

    const results = await Promise.all(
      shoes.map(async (shoe) => {
        const reviews = await Rating.find({ shoeId: shoe._id });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        return {
          ...shoe.toObject(),
          rating: Number(avgRating.toFixed(1)),
        };
      })
    );

    let filtered = results;
    if (filters.minRating) {
      filtered = results.filter(
        (s) => s.rating >= filters.minRating
      );
    }

    const aiResponse = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful shoe shop assistant.",
        },
        {
          role: "user",
          content: `
User asked: "${message}"

Products:
${JSON.stringify(filtered)}
`,
        },
      ],
    });

    res.json({
      reply: aiResponse.choices[0].message.content,
      products: filtered,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;