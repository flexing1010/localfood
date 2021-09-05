import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserInfo } from "../queries/userQuery.js";
import {
  getOrderItems,
  joinOrderTransaction,
} from "../queries/productQuery.js";

// import { Router } from "express";
const { sign } = jwt;

export const postJoinController = async (req, res) => {
  let { name, username, email, password, passwordConfirm, address1, address2 } =
    req.body;

  if (password != passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 다릅니다",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 5);
  await db.execute(
    "INSERT INTO user (name, username, email, password,address1,address2) VALUES(?,?,?,?,?,?)",
    [name, username, email, encryptedPassword, address1, address2],
    (err, result) => {
      if (err) {
        console.log(err);
        if (err.errno === 1062) {
          return res
            .status(400)
            .send({ errorMessage: "이미 존재하는 닉네임/이메일 입니다" });
        }
      } else {
        // create cart for a newly joined user
        db.execute("Insert into cart (user_id) values(?)", [result.insertId]);
        console.log(result.insertId);
        res.send("Values Inserted");
      }
    }
  );
};

export const postLoginController = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (username && password) {
      //grab entire row from user table where username is same as username provided by front
      let user = await getUserInfo(username, undefined);
      user = user[0];

      //if user info doesn't exist
      if (!user) {
        return res
          .status(400)
          .send({ errorMessage: "존재하지 않는 아이디입니다" });
      }

      //if user does exist compare its password
      const match = await bcrypt.compare(password, user.password);

      //if provided password doesn't match with pw from db
      if (!match) {
        return res.status(401).json({ errorMessage: "잘못된 비밀번호 입니다" });
      }

      // let cartId = await getUserCart(user.id);
      // cartId = cartId[0].id;
      console.log(user.isAdmin, user.id);
      //Create accessToken
      const accessToken = sign(
        {
          username: user.username,
          id: user.id,
          isAdmin: user.isAdmin,
        },
        "xlSWyC0Jw2"
      );

      res.send({
        token: accessToken,
        isAdmin: user.isAdmin,
        username: user.username,
        id: user.id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAuth = (req, res) => {
  res.json(req.user);
};

export const viewMypage = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await getUserInfo(undefined, id);
    user = user[0];
    if (user.password) {
      delete user.password;
    }

    // let orders = await getOrderInfo(undefined, id);
    let orders = await joinOrderTransaction();
    orders = orders.filter((order) => order.user_id === parseInt(id));

    let orderItems = await Promise.all(
      orders.map((order) => {
        return getOrderItems(order.order_id);
      })
    );

    res.send({ user, orders, orderItems });
  } catch (err) {
    console.log(err);
  }
};
