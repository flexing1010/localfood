import express from "express";
import {
  postJoinController,
  postLoginController,
  getAuth,
} from "../controllers/userController.js";
import { publicOnlyMiddleware, validateToken } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Home");
});

rootRouter.route("/join").post(publicOnlyMiddleware, postJoinController);
rootRouter.route("/login").post(publicOnlyMiddleware, postLoginController);
rootRouter.route("/auth").get(validateToken, getAuth);

export default rootRouter;
