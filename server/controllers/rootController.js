import { deletePost } from "../queries/adminQuery.js";
import {
  insertPost,
  selectAnnouncement,
  selectPost,
  selectQnA,
  updatePost,
} from "../queries/rootQuery.js";

export const getAnnouncement = async (req, res) => {
  const announcement = await selectAnnouncement();

  res.json(announcement);
};

export const getQnA = async (req, res) => {
  const qnA = await selectQnA();

  res.json(qnA);
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await selectPost(id);
  res.json(post);
};

export const createPost = async (req, res) => {
  const postInfo = req.body;
  try {
    await insertPost(postInfo);
  } catch (err) {
    console.log(err);
  }
};

export const editPost = async (req, res) => {
  const newPost = req.body;
  try {
    await updatePost(newPost);
    res.send();
  } catch (err) {
    console.log(err);
  }
};

export const deletePostReq = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
