import { db } from "../db.js";

export const insertTransaction = (transactionInfo, impData) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into transaction (user_id,order_id,buyer_addr,buyer_tel,buyer_name,pay_method,status,merchant_uid,name,amount) values (?,?,?,?,?,?,?,?,?,?)",
      [
        transactionInfo.user_id,
        parseInt(transactionInfo.order_id),
        impData.buyer_addr,
        impData.buyer_tel,
        impData.buyer_name,
        impData.pay_method,
        transactionInfo.status,
        impData.merchant_uid,
        impData.name,
        impData.amount,
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

export const selectTransaction = (merchant_uid) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "select * from transaction where merchant_uid = ?",
      [merchant_uid],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const selectOrderItemQuantity = (orderId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select product_id,quantity From order_item where order_id = ?",
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

export const updateStock = (updatedItem) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Update product set stock = ? where id = ?",
      [updatedItem.stock, updatedItem.product_id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
