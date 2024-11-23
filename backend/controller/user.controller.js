import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("error in fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  // Check if required fields are provided
  if (!user.name || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newuUser = new User(user);

  try {
    await newuUser.save();
    res.status(201).json({ success: true, data: newuUser });
  } catch (error) {
    console.error("Error creating new user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
