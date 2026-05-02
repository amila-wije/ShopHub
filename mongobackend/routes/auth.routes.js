import express from "express";
import { auth } from "../lib/auth.js";


const router = express.Router();

router.post("/signup",async (req,res)=> {
    const {email,password,name} = req.body;

    try {
    const user = await auth.api.signUp({
      email,
      password,
      name,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const session = await auth.api.signIn({
      email,
      password,
    });

    res.status(200).json(session);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

export default router;