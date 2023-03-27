import express from "express";
import * as services from "./serices.js";

const router = express.Router();

router.post("/test", services.defaultTestUpdate);

router.get("/test", services.getDefaultTest);

router.post("/pass/:courseId/:lessonId", services.passLesson);

router.get("/user/courses/all", services.getAllCourses);

router.get("/user/course/:id", services.getCourseWithLessons);

router.get("/user/ongoing-courses", services.getUserOngoingCourses);

router.get(
  "/user/course/:id/lesson/:lessonId",
  services.getCourseLessonWithTest
);

export default router;
