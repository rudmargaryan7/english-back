import express from "express";
import tokenValidator from "../utils/tokenValidator.js";
import CoursesRouter from "./Courses/router.js";
import ApiRoutes from "./Api/router.js";
import { getDefaultTest } from "./Admin/services.js";

const router = express.Router();

router.use("/courses", CoursesRouter);

router.get("/test", getDefaultTest);

router.use(tokenValidator);

router.use("/", ApiRoutes);

export default router;
