import express from "express";
import { home } from "../controllers/productController.js";
import {
  postJoinController,
  postLoginController,
  getAuth,
} from "../controllers/userController.js";
import { publicOnlyMiddleware, validateToken } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.route("/join").post(publicOnlyMiddleware, postJoinController);
rootRouter.route("/login").post(publicOnlyMiddleware, postLoginController);
rootRouter.route("/auth").get(validateToken, getAuth);

export default rootRouter;
