import express from "express";
import {
  postCart,
  getCart,
  deleteCartItem,
  updateQuantity,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/").post(postCart).get(getCart);
productRouter.route("/update").post(updateQuantity).delete(deleteCartItem);

export default productRouter;
