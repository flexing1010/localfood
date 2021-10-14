import express from "express";
import {
  deleteAdminItem,
  getAllUser,
  postItem,
  patchIsAdmin,
  updateItem,
  getOrderInfoForAdmin,
  patchStatus,
  // getTransactionItem,
} from "../controllers/adminController.js";
import { itemImgUpload } from "../middlewares.js";

const adminRouter = express.Router();

// adminRouter.route("/post-item").post(itemImgUpload.array("itemImgs"), postItem);
adminRouter.route("/post-item").post(
  itemImgUpload.fields([
    { name: "coverImg", maxCount: 1 },
    { name: "itemImgs", maxCount: 3 },
  ]),
  postItem
);
adminRouter
  .route("/item-list")
  // .patch(itemImgUpload.single("imgUrl"), updateItem)
  .patch(
    itemImgUpload.fields([
      { name: "imgUrl", maxCount: 1 },
      { name: "editedImgs", maxCount: 3 },
    ]),
    updateItem
  )
  .delete(deleteAdminItem);

adminRouter.route("/user-list").get(getAllUser).patch(patchIsAdmin);

adminRouter.route("/manage-order").get(getOrderInfoForAdmin).patch(patchStatus);
// adminRouter.route("/manage-order/edit").get(getTransactionItem);

export default adminRouter;
