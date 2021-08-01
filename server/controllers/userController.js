import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserInfo } from "../queries/userQuery.js";

// import { Router } from "express";
const { sign } = jwt;

export const postJoinController = async (req, res) => {
  let { name, username, email, password, passwordConfirm } = req.body;

  if (password != passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 다릅니다",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 5);
  await db.execute(
    "INSERT INTO user (name, username, email, password) VALUES(?,?,?,?)",
    [name, username, email, encryptedPassword],
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
      let user = await getUserInfo(username);
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

      //Create accessToken
      const accessToken = sign(
        {
          username: user.username,
          id: user.id,
        },
        "xlSWyC0Jw2"
      );

      res.json({
        token: accessToken,
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
