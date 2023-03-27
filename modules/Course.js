import mongoose from "mongoose";

const Course = new mongoose.Schema({
  title: String,
  description: String,
  picture_src: String,
  tags: Array,
  created_at: String,
  level: String,
});

export default mongoose.model("Course", Course);
