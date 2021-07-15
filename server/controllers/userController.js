import { db } from "../db.js";
import bcrypt from "bcrypt";
// import { sign } from "jsonwebtoken";

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
  if (username && password) {
    //* grabs every column from the table
    await db.query(
      "Select * from user where username = ?",
      [username],
      // "Select * from user where username = ? and password = ?",
      // [username, encryptedPassword],
      async (err, result) => {
        const user = await Object.values(JSON.parse(JSON.stringify(result)));
        if (err) {
          return res.send(console.log(err));
        }
        console.log(user);
        if (user.length === 0) {
          return res
            .status(400)
            .send({ errorMessage: "존재하지 않는 아이디입니다" });
        }

        const match = await bcrypt.compare(password, user[0].password);
        // else if(result.length > 0) {
        if (!match) {
          return res
            .status(400)
            .send({ errorMessage: "잘못된 비밀번호 입니다" });
        }
        res.redirect("/");
      }
    );
  } else {
    res.send({ errorMessage: "잘못된 비밀번호 입니다" });
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
