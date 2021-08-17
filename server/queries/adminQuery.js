import { db } from "../db.js";

export const insertItem = (itemInfo, imgFile) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into product (product_name,brand,weight,head_size,string_pattern,balance,length,grip_size,price,stock,description,imgUrl) values (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        itemInfo.product_name,
        itemInfo.brand,
        itemInfo.weight,
        itemInfo.head_size,
        itemInfo.string_pattern,
        itemInfo.balance,
        itemInfo.length,
        itemInfo.grip_size,
        itemInfo.price,
        itemInfo.stock,
        itemInfo.description,
        imgFile.filename,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const insertItemImgs = (imgFile, insertedItem) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert Into images (img_url,product_id) values(?,?)",
      [imgFile.filename, insertedItem.insertId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.execute("select * from product", (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
