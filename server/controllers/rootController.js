import {
  insertPost,
  selectAnnouncement,
  selectPost,
  selectQnA,
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
  console.log(id);
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
