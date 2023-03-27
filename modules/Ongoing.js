import mongoose from "mongoose";

const Ongoing = new mongoose.Schema({
  userId: String,
  courseId: String,
  passedLessonsIds: Array,
  isPassed: { type: Boolean, default: false },
});

export default mongoose.model("Ongoing", Ongoing);
