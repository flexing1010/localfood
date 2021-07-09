import { db } from "../db.js";
import bcrypt from "bcrypt";

export const postJoin = async (req, res) => {
  const { name, username, email, password, passwordConfirm } = req.body;
  // bcrypt.hash(passwordCo)
  if (password != passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 다릅니다",
    });
  }

  await db.query(
    "INSERT INTO user (name, username, email, password) VALUES(?,?,?,?)",
    [name, username, email, password],
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
