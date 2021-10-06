import {
  deleteItem,
  deleteItemImgs,
  editItemImgs,
  insertCategory,
  // getAllItems,
  insertItem,
  insertItemImgs,
  selectTransaction,
  selectTransactionItem,
  updateIsAdmin,
  updateItemInfo,
  updateStatus,
} from "../queries/adminQuery.js";
import { getAllProducts } from "../queries/productQuery.js";
import { getAlluserInfo } from "../queries/userQuery.js";
// import { updateIsAdmin } from "c:/users/jaykim/desktop/projects/localfood/server/queries/adminquery.js";

export const postItem = async (req, res) => {
  const itemInfo = JSON.parse(req.body.itemInfo);
  const imgFiles = req.files.itemImgs;
  const coverImg = req.files.coverImg;

  try {
    if (itemInfo) {
      const insertedItem = await insertItem(itemInfo, coverImg[0]);
      await insertCategory(parseInt(itemInfo.brand), insertedItem.insertId);
      await imgFiles.forEach((img) => {
        insertItemImgs(img, insertedItem);
      });
      const allItems = await getAllProducts();
      res.json(allItems);
    }
  } catch (err) {
    console.log(err);
  }
  // res.send({img:req.files[0].path})
};

// export const getItemList = async (req, res) => {
//   try {
//     const allItems = await getAllItems();
//     res.json(allItems);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updateItem = async (req, res) => {
  const editImg = req.files.imgUrl;
  const editImgs = req.files.editedImgs;
  const editInfo = JSON.parse(req.body.editInfo);
  const itemId = req.body.itemId;

  try {
    if (editImg && editImgs) {
      await updateItemInfo(itemId, editInfo, editImg[0]);
      await deleteItemImgs(itemId);
      await editImgs.forEach((img) => {
        editItemImgs(img, itemId);
      });
    } else if (editImg) {
      await updateItemInfo(itemId, editInfo, editImg[0]);
    } else if (editImgs) {
      await deleteItemImgs(itemId);
      await editImgs.forEach((img) => {
        editItemImgs(img, itemId);
      });
    }
    await updateItemInfo(itemId, editInfo, undefined);

    const allItems = await getAllProducts();
    res.send({ allItems, success: "수정되었습니다" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAdminItem = async (req, res) => {
  const { targetId } = req.body;
  try {
    await deleteItem(targetId);
    console.log("item deleted");
    res.send({ success: "삭제되었습니다" });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await getAlluserInfo();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};

export const patchIsAdmin = async (req, res) => {
  const newIsAdminInfo = req.body;
  const filteredArray = newIsAdminInfo.map((item) => {
    return (({ username, isAdmin }) => ({ username, isAdmin }))(item);
  });

  try {
    filteredArray.forEach(async (item) => {
      await updateIsAdmin(item);
    });
    console.log("successss");
    res.send();
  } catch (err) {
    console.log(err);
  }
};

export const getOrderInfoForAdmin = async (req, res) => {
  try {
    const transaction = await selectTransaction();
    const transactionItem = await Promise.all(
      transaction.map((item) => {
        return selectTransactionItem(item.order_id);
      })
    );

    res.send({ transaction, transactionItem });
  } catch (err) {
    console.log(err);
  }
};

export const patchStatus = async (req, res) => {
  const newStatusInfo = req.body;
  const filteredArray = newStatusInfo.map((item) => {
    return (({ id, status }) => ({ id, status }))(item);
  });
  try {
    filteredArray.forEach(async (item) => {
      await updateStatus(item);
    });
    // const transaction = await selectTransaction();
    // res.send({ transaction });
    res.send();
  } catch (err) {
    console.log(err);
  }
};
