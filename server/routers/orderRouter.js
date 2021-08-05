import express from "express";
import { getUser, postOrder } from "../controllers/productController.js";

const orderRouter = express.Router();

orderRouter.route("/").get(getUser).post(postOrder);
// orderRouter.route("/:id");

export default orderRouter;
