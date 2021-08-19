import express from "express";
import {
  deleteAdminItem,
  postItem,
  updateItem,
} from "../controllers/adminController.js";
import { itemImgUpload } from "../middlewares.js";

const adminRouter = express.Router();

adminRouter.route("/post-item").post(itemImgUpload.array("itemImgs"), postItem);
adminRouter
  .route("/item-list")
  .patch(itemImgUpload.single("imgUrl"), updateItem)
  .delete(deleteAdminItem);

export default adminRouter;
