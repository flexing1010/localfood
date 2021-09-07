import { db } from "../db.js";

export const insertTransaction = (transactionInfo) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into transaction (user_id,order_id,buyer_addr,buyer_tel,buyer_name,pay_method,status,merchant_uid,name,amount) values (?,?,?,?,?,?,?,?,?,?)",
      [
        transactionInfo.user_id,
        parseInt(transactionInfo.order_id),
        transactionInfo.buyer_addr,
        transactionInfo.buyer_tel,
        transactionInfo.buyer_name,
        transactionInfo.pay_method,
        transactionInfo.status,
        transactionInfo.merchant_uid,
        transactionInfo.name,
        transactionInfo.amount,
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

// export const joinQuantityInfo = () => {
//   return new Promise((resolve, reject) => {
//     db.execute("Select stock From product where id = 21", (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   });
// };

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
