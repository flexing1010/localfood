import { db } from "../db.js";
import {
  insertTransaction,
  selectOrderItemQuantity,
  selectTransaction,
  updateStock,
} from "../queries/orderQuery.js";
import {
  emptyCartItems,
  getCartId,
  getOrderInfo,
  getOrderItems,
  insertOrderItem,
} from "../queries/productQuery.js";
import { getUserInfo } from "../queries/userQuery.js";
import axios from "axios";

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
              item.stock,
              item.imgUrl
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
    if (orderInfo && orderItems) {
      res.send({ orderInfo, orderItems, user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postTransaction = async (req, res) => {
  const transactionInfo = req.body;
  const updatedItems = transactionInfo.orderItems;
  //   const orderId = parseInt(transactionInfo.order_id);
  try {
    const { imp_uid, merchant_uid } = req.body;

    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "3207874947066307", // REST API 키
        imp_secret:
          "XC7NolPMCUwpF1l6NnLpILbx7928HZ2FCas1vhN7ckxSlTY9hKyZwKwETyMByPgbZIcv0ZDcjb4E43Nm", // REST API Secret
      },
    });
    const { access_token } = getToken.data.response;

    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: "get", // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
    });
    const paymentData = getPaymentData.data.response; // 조회한 결제 정보

    const { amount, status } = paymentData;
    if (amount === transactionInfo.amount && status === "paid") {
      // await insertTransaction(transactionInfo);
      await insertTransaction(transactionInfo, paymentData);
      updatedItems.forEach(async (item) => {
        await updateStock(item);
        console.log("updated");
      });
      const cartId = await getCartId(transactionInfo.user_id);

      await emptyCartItems(cartId[0].id);

      console.log("success");
      res.sendStatus(200);
    } else {
      // 결제 금액 불일치. 위/변조 된 결제
      throw { status: "forgery", message: "결제실패" };
    }

    // let quantity = await selectOrderItemQuantity(orderId);
    // console.log("success");
    // res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderInfo = await getOrderInfo(orderId, undefined);
    const orderItems = await getOrderItems(orderId);

    res.send({ orderInfo, orderItems });
  } catch (err) {
    console.log(err);
  }
};

export const getTransaction = async (req, res) => {
  const merchant_uid = req.params.id;
  try {
    const transaction = await selectTransaction(merchant_uid);
    res.send({ transaction });
  } catch (err) {
    console.log(err);
  }
};
