import { db } from "../db.js";

export const selectAnnouncement = () => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select * From message_board where board_category = ? ",
      [0],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const selectPost = (postId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select * From message_board where id = ? ",
      [postId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
