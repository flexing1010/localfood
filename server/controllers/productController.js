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

export const search = async (req, res) => {
  const { keyword } = req.query;
  await db.query(
    "Select * From product where product_name Like ?",
    "%" + keyword + "%",
    async (err, result) => {
      if (err) {
        return res.send(console.log(err));
      } else if (result.length === 0) {
        return res.send({ errorMessage: "일치하는 검색결과가 없습니다" });
      }
      console.log(result);
      res.json(result);
    }
  );
};

export const postCart = async (req, res) => {
  const { id } = req.body;
  console.log(id);
};
