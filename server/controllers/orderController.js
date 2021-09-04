import { db } from "../db.js";
import {
  insertTransaction,
  selectOrderItemQuantity,
  updateStock,
} from "../queries/orderQuery.js";
import {
  getOrderInfo,
  getOrderItems,
  insertOrderItem,
} from "../queries/productQuery.js";
import { getUserInfo } from "../queries/userQuery.js";

export const postOrder = async (req, res) => {
  const { user_id, grandTotal, orderItems } = req.body;
  let createdAt = new Date();

  createdAt =
    createdAt.getFullYear() +
    "-" +
    (createdAt.getMonth() + 1) +
    "-" +
    createdAt.getDate();

  try {
    db.execute(
      "insert into orders (createdAt, grandTotal, user_id) Values(?,?,?)",
      [createdAt, grandTotal, user_id],
      async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          await orderItems.forEach((item) => {
            insertOrderItem(
              result.insertId,
              item.product_id,
              item.quantity,
              item.price,
              item.product_name,
              item.stock
            );
          });
          res.send({ orderId: result.insertId });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const viewOrder = async (req, res) => {
  const { id } = req.params;

  try {
    let orderInfo = await getOrderInfo(id, undefined);
    orderInfo = orderInfo[0];
    let orderItems = await getOrderItems(orderInfo.id);
    let user = await getUserInfo(undefined, orderInfo.user_id);

    user = user[0];

    if (user.password) {
      delete user.password;
    }
    console.log(orderInfo, orderItems, user);
    if (orderInfo && orderItems) {
      res.send({ orderInfo, orderItems, user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postTransaction = async (req, res) => {
  const transactionInfo = req.body;
  console.log("checkfororderitem", transactionInfo);
  const updatedItems = transactionInfo.orderItems;
  //   const orderId = parseInt(transactionInfo.order_id);
  try {
    await insertTransaction(transactionInfo);
    updatedItems.forEach(async (item) => {
      await updateStock(item);
      console.log("updated");
    });
    // let quantity = await selectOrderItemQuantity(orderId);
    console.log("success");
  } catch (err) {
    console.log(err);
  }
};
