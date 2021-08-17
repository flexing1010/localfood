import express from "express";
import { postItem } from "../controllers/adminController.js";
import { itemImgUpload } from "../middlewares.js";

const adminRouter = express.Router();

adminRouter.route("/post-item").post(itemImgUpload.array("itemImgs"), postItem);
// adminRouter.route("/item-list").get(getItemList);

export default adminRouter;
