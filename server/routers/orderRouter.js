import express from "express";
import { postOrder, viewOrder } from "../controllers/productController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(postOrder);
orderRouter.route("/:id").get(viewOrder);

export default orderRouter;
