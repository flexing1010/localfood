import { db } from "../db.js";

// const isHeroku = process.env.NODE_ENV === "production";

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
        coverImg.location,
        // coverImg.filename,
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

export const insertCategory = (brandId, itemId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into category_item (category_id,product_id) values(?,?)",
      [brandId, itemId],
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
      [imgFile.location, insertedItem.insertId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// [imgFile.filename, itemId],
export const editItemImgs = (imgFile, itemId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert Into images (img_url,product_id) values(?,?)",
      [imgFile.location, itemId],
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

// newImg.filename,
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
          newImg.location,
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

export const updateIsAdmin = (newInfo) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Update user set isAdmin = ? where username = ?",
      [parseInt(newInfo.isAdmin), newInfo.username],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const selectTransaction = () => {
  return new Promise((resolve, reject) => {
    db.execute("select * from transaction", (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

export const selectTransactionItem = (orderId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "select product_id,order_id, quantity,price,product_name from order_item where order_id=?",
      [orderId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// export const patchStatus =
export const updateStatus = (newInfo) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Update transaction Set status = ? where id = ?",
      [parseInt(newInfo.status), newInfo.id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Delete From message_board where id = ?",
      [postId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
