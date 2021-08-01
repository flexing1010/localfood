import { db } from "../db.js";

export const getUserInfo = (username) => {
  return new Promise((resolve, reject) => {
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
