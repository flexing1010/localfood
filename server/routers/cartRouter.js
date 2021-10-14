import express from "express";
import {
  postCart,
  getCart,
  deleteCartItem,
} from "../controllers/productController.js";

const cartRouter = express.Router();

cartRouter.route("/").post(postCart).get(getCart);
cartRouter.route("/update").delete(deleteCartItem);

export default cartRouter;
