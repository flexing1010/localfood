export const postItem = (req, res) => {
  const itemInfo = JSON.parse(req.body.itemInfo);
  console.log(req.files);
  console.log(itemInfo.product_name);
};
