import Course from "../../modules/Course.js";

export const getAllCourses = async (req, res) => {
  const data = await Course.find().select("-_id -__v");
  return res.status(200).json(data);
};
