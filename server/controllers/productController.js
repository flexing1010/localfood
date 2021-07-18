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
