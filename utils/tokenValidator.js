import User from "../modules/User.js";
import jwt from "jsonwebtoken";
import config from "config";

const SECRET = config.get("JWT.TOKEN_SECRET");
const EXPIRE = config.get("JWT.EXPIRE");
const adminLogin = config.get("admin.login");

export default async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    const verify = await jwt.verify(token, SECRET, { expiresIn: EXPIRE });
    if (verify.name === adminLogin) {
      return next();
    }
    const user = await User.findOne({ name: verify.name }).select(
      "-password  -__v"
    );
    req.user = user;
    return next();
  } catch {
    return res.status(403).send({ errors: [{ msg: "token has expired." }] });
  }
  next();
};
