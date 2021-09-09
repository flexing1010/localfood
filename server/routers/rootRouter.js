import express from "express";
import {
  deleteItemReview,
  getReview,
  // getUser,
  home,
  postReview,
  // postOrder,
  search,
  viewByBrand,
  viewProduct,
} from "../controllers/productController.js";
import { getAnnouncement, getPost } from "../controllers/rootController.js";
import {
  postJoinController,
  postLoginController,
  getAuth,
} from "../controllers/userController.js";
import { publicOnlyMiddleware, validateToken } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/by-brand/:id", viewByBrand);

rootRouter.get("/view/:id", viewProduct);
rootRouter.post("/view/:id/review", postReview);
rootRouter.get("/view/:id/review", getReview);
rootRouter.delete("/view/:id/review", deleteItemReview);

rootRouter.route("/join").post(publicOnlyMiddleware, postJoinController);
rootRouter.route("/login").post(publicOnlyMiddleware, postLoginController);
rootRouter.route("/auth").get(validateToken, getAuth);
rootRouter.get("/search", search);
rootRouter.get("/board/view-post/:id", getPost);
rootRouter.get("/board/announcement", getAnnouncement);
// rootRouter.route("/order").get(getUser).post(postOrder);

export default rootRouter;
