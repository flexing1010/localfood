import express from "express";
import {
  getOrder,
  getTransaction,
  postOrder,
  postTransaction,
  viewOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(postOrder);
orderRouter.route("/:id").get(viewOrder);
orderRouter.route("/result").post(postTransaction);
orderRouter.route("/result/:id").get(getTransaction);

orderRouter.route("/payment/:id/mobile").get(getOrder);

export default orderRouter;
