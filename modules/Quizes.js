import mongoose from "mongoose";

const Quiz = new mongoose.Schema({
  title: String,
  description: String,
  answers: Array,
  answerIndex: String | Number,
  lessonId: { type: String, default: null },
  slug: String,
  type: { type: String, default: "lesson" },
});

export default mongoose.model("Quiz", Quiz);
