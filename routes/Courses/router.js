import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";
import tokenValidator from "../../utils/tokenValidator.js";

const router = express.Router();

router.get("/all", services.getAllCourses);

export default router;
