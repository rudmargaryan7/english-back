import mongoose from "mongoose";

const Lesson = new mongoose.Schema({
  title: String,
  description: String,
  slug: String,
  time: String,
  courseId: String,
  videoUrl: String,
  created_at: String,
});

export default mongoose.model("Lesson", Lesson);
