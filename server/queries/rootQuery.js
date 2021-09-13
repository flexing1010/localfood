import { db } from "../db.js";

export const selectAnnouncement = () => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select * From message_board where board_category = ? Order By createdAt Desc",
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

export const selectQnA = () => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select * From message_board where board_category = ? Order By createdAt Desc",
      [1],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const insertPost = (postInfo) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Insert into message_board (username,title,body,board_category) values(?,?,?,?) ",
      [
        postInfo.username,
        postInfo.postTitle,
        postInfo.content,
        postInfo.board_category,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const updatePost = (newPost) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Update message_board set body = ? where username = ?",
      [newPost.content, newPost.username],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
