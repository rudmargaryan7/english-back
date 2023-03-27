import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";
import tokenValidator from "../../utils/tokenValidator.js";

const router = express.Router();

router.use(tokenValidator);

router.post(
  "/create",
  body("title").notEmpty().withMessage("Title field required"),
  body("description").notEmpty().withMessage("Description field required"),
  services.createCourse
);

router.get("/get-all-users", services.getUsersList);

router.get("/get-all-courses", services.getCoursesList);

router.get("/class/:id", services.getClass);

router.get("/default-test", services.getDefaultTest);

router.put("/default-test", services.createOrUpdateDefaultTest);

router.put(
  "/class/:id",
  body("title").notEmpty().withMessage("Title field required"),
  body("description").notEmpty().withMessage("Description field required"),
  services.updateCourse
);

router.delete("/class/:id", services.deleteCourse);

export default router;
