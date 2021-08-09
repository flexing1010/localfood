import express from "express";
import { viewMypage } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/:id", viewMypage);

export default userRouter;

// userRouter
