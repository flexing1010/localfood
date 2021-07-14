import { db } from "../db.js";
import bcrypt from "bcrypt";
import { response } from "express";

export const postJoinController = async (req, res) => {
  let { name, username, email, password, passwordConfirm } = req.body;

  if (password != passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 다릅니다",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 5);
  await db.query(
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
        res.send("Values Inserted");
      }
    }
  );
};

export const postLoginController = async (req, res) => {
  let { username, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 5);
  if (username && encryptedPassword) {
    //* grabs evert column from the table
    await db.query(
      "Select * from user where username = ? and password = ?",
      [username, encryptedPassword],
      (err, result) => {
        if (result.length > 0) {
          console.log("logged in");
        } else {
          res.send("잘못된 닉네임/비밀번호 입니다");
        }
        // response.end();
      }
    );
  } else {
    res.send("닉네임과 비밀번호를 입력해주세요");
  }
};
// app.post("/join", (req, res) => {
//     // const { body: name, age } = req;
//     const name = req.body.name;
//     const age = req.body.age;
//     db.query(
//       "INSERT INTO user (name, age) VALUES (?,?)",
//       [name, age],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send("Values Inserted");
//         }
//       }
//     );
//   });
