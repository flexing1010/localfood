import { selectAnnouncement, selectPost } from "../queries/rootQuery.js";

export const getAnnouncement = async (req, res) => {
  const announcement = await selectAnnouncement();
  console.log(announcement);
  res.json(announcement);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await selectPost(id);
  res.json(post);
};
