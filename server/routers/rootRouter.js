import express from "express";
import { postJoin } from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Home");
});

rootRouter.route("/join").post(postJoin);

export default rootRouter;
