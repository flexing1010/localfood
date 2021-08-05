import { db } from "../db.js";

export const getCartId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select id from cart where user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const getCartItemInfo = (res, productIds) => {
  return db.query(
    "select * from product where id In (?)",
    [productIds],
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.send(result);
    }
  );
};

export const checkDuplicateItem = (cartId, productId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select exists(select * from cart_item where cart_id=? and product_id=?) ",
      [cartId, productId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// export const bring

export const deleteItem = (targetId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "delete from cart_item where id = ?",
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

export const insertOrderItem = (
  order_id,
  product_id,
  quantity,
  price,
  product_name
) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into order_item (order_id, product_id, quantity, price, product_name) values(?,?,?,?,?)",
      [order_id, product_id, quantity, price, product_name],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
