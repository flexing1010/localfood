import { db } from "../db.js";

export const home = async (req, res) => {
  await db.query("SELECT * FROM product", async (err, result) => {
    const productList = await result;
    if (err) {
      return res.send(console.log(err));
    }
    res.json(productList);
  });
};

export const viewProduct = async (req, res) => {
  const { id } = req.params;
  await db.query(
    "select * From product where product_id =?",
    [id],
    async (err, result) => {
      if (err) {
        return res.send(console.log(err));
      }
      res.json(result);
    }
  );
};
