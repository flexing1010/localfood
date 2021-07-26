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
