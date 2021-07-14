import express from "express";
import {
  postJoinController,
  postLoginController,
} from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Home");
});

rootRouter.route("/join").post(postJoinController);
rootRouter.route("/login").post(postLoginController);

export default rootRouter;
