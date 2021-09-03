import express from "express";
import {
  postOrder,
  postTransaction,
  viewOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(postOrder);
orderRouter.route("/:id").get(viewOrder);
orderRouter.route("/result").post(postTransaction);

export default orderRouter;
