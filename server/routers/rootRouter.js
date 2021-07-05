import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("Home");
});

export default rootRouter;
