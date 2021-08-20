import { db } from "../db.js";

export const getUserInfo = (username, userId) => {
  return new Promise((resolve, reject) => {
    if (username && !userId) {
      db.execute(
        "Select * from user where username = ?",
        [username],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      );
    } else {
      db.execute("Select * from user where id = ?", [userId], (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }
  });
};

export const getAlluserInfo = () => {
  return new Promise((resolve, reject) => {
    db.execute(
      "select name,username,email,address1,address2,isAdmin from user",
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

// export const getUserCart = (userId) => {
//   return new Promise((resolve, reject) => {
//     db.execute(
//       "select id from cart where user_id = ?",
//       [userId],
//       (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(result);
//       }
//     );
//   });
// };
