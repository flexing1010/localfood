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

export const insertComment = (comment, boardId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "insert into comment (comment_body, username, createdAt, message_board_id) values (?,?,?,?)",
      [comment.commentBody, comment.username, comment.createdAt, boardId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const selectComments = (boardId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "Select * from comment where message_board_id = ? order by id desc",
      [boardId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

export const deleteComment = (targetId) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "delete from comment where id = ?",
      [targetId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
