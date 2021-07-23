import express from "express";
import {
  postCart,
  home,
  search,
  viewProduct,
  getCart,
} from "../controllers/productController.js";
import {
  postJoinController,
  postLoginController,
  getAuth,
} from "../controllers/userController.js";
import { publicOnlyMiddleware, validateToken } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/view/:id", viewProduct);

rootRouter.route("/join").post(publicOnlyMiddleware, postJoinController);
rootRouter.route("/login").post(publicOnlyMiddleware, postLoginController);
rootRouter.route("/auth").get(validateToken, getAuth);
rootRouter.get("/search", search);

rootRouter.route("/cart").post(postCart).get(getCart);

export default rootRouter;
