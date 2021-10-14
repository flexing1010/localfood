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
import {
  createComment,
  createPost,
  deletePostReq,
  deleteQnAComment,
  editPost,
  getAnnouncement,
  getComment,
  getPost,
  getQnA,
} from "../controllers/rootController.js";
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

//board route
rootRouter.get("/board/view-post/:id", getPost);
rootRouter.patch("/board/view-post/:id/edit", editPost);
rootRouter.delete("/board/view-post/:id/delete", deletePostReq);
rootRouter.get("/board/announcement", getAnnouncement);
rootRouter.get("/board/qna", getQnA);
rootRouter.post("/board/create-post", createPost);
rootRouter.post("/board/view-post/:id/comment", createComment);
rootRouter.get("/board/view-post/:id/comment", getComment);
rootRouter.delete("/board/view-post/:id/comment", deleteQnAComment);

// rootRouter.route("/order").get(getUser).post(postOrder);

export default rootRouter;
