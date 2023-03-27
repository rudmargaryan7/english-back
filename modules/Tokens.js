import mongoose from "mongoose";

const Token = new mongoose.Schema({
  label: String,
  value: String,
});

export default mongoose.model("Token", Token);
