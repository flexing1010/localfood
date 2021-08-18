import {
  getAllItems,
  insertItem,
  insertItemImgs,
} from "../queries/adminQuery.js";

export const postItem = async (req, res) => {
  const itemInfo = JSON.parse(req.body.itemInfo);
  const imgFiles = req.files;
  console.log(req.files);
  console.log(itemInfo);
  try {
    if (itemInfo) {
      const insertedItem = await insertItem(itemInfo, imgFiles[0]);
      console.log(insertedItem.insertId);
      await imgFiles.forEach((img) => {
        insertItemImgs(img, insertedItem);
      });
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
  console.log(req.body);
  const imgFile = req.file;
  const editInfo = JSON.parse(req.body.editInfo);
  console.log(imgFile, editInfo);
};
