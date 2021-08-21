import { db } from "../db.js";

export const insertItem = (itemInfo, coverImg) => {
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
        coverImg.filename,
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

export const insertItemImgs = (imgFile, insertedItem, itemId) => {
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

export const editItemImgs = (imgFile, itemId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert Into images (img_url,product_id) values(?,?)",
      [imgFile.filename, itemId],
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

export const updateItemInfo = (itemId, newItemInfo, newImg) => {
  return new Promise((resolve, reject) => {
    if (newImg) {
      db.execute(
        "Update product set product_name = ?,brand = ?,weight = ?,head_size = ?,string_pattern = ?,balance = ?,length = ?,grip_size = ?,price = ?,stock = ?,description = ?,imgUrl = ? where id = ?",
        [
          newItemInfo.product_name,
          newItemInfo.brand,
          newItemInfo.weight,
          newItemInfo.head_size,
          newItemInfo.string_pattern,
          newItemInfo.balance,
          newItemInfo.length,
          newItemInfo.grip_size,
          newItemInfo.price,
          newItemInfo.stock,
          newItemInfo.description,
          newImg.filename,
          itemId,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      );
    }
    //no newImg
    db.execute(
      "Update product set product_name = ?,brand = ?,weight = ?,head_size = ?,string_pattern = ?,balance = ?,length = ?,grip_size = ?,price = ?,stock = ?,description = ? where id = ?",
      [
        newItemInfo.product_name,
        newItemInfo.brand,
        newItemInfo.weight,
        newItemInfo.head_size,
        newItemInfo.string_pattern,
        newItemInfo.balance,
        newItemInfo.length,
        newItemInfo.grip_size,
        newItemInfo.price,
        newItemInfo.stock,
        newItemInfo.description,
        itemId,
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

export const deleteItemImgs = (itemId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "delete from images where product_id = ?",
      [itemId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// export const updateItemImgs = (itemId, newImgs) =>{
//   return new Promise((resolve,reject)=>{
//     db.execute('Update images set ')
//   })
// }

export const deleteItem = (targetId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "delete from product where id = ?",
      [targetId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
