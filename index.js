import config from "config";
import express from "express";
import { connect } from "mongoose";
import tokenValidator from "./utils/tokenValidator.js";
import UserRouter from "./routes/User/router.js";
import Router from "./routes/router.js";
import cors from "cors";
import https from "https";
import path from "path";
import AdminRouter from "./routes/Admin/router.js";
import { fileURLToPath } from "url";
// Dirname on ES6 Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configs
const port = config.get("server.port");
const bd = config.get("databse.mongoURL");

//routing
const app = express();

// middlewares
app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Headers": "*",
  })
);
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  console.log('kpela')
  return res.status(200).send({connected:true});
});
app.use("/user", UserRouter);
app.use("/api", Router);
app.use("/admin", AdminRouter);

// ssl Server

app.listen(port, () => {
  connect(bd).then(() => console.log("Mongoo connected!!"));
  console.log("started development server");
});
