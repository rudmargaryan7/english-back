import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
  date: String,
  level: { type: String, default: "A1" },
  isLevelCompleted: Boolean,
});

export default mongoose.model("User", User);
