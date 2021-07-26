import { db } from "../db.js";
import {
  getCartId,
  checkDuplicateItem,
  getCartItemInfo,
} from "../queries/productQuery.js";

export const home = async (req, res) => {
  db.execute("SELECT * FROM product", async (err, result) => {
    const productList = await result;
    if (err) {
      return res.send(console.log(err));
    }
    res.json(productList);
  });
};

export const viewProduct = async (req, res) => {
  const { id } = req.params;
  db.execute("select * From product where id =?", [id], async (err, result) => {
    if (err) {
      return res.send(console.log(err));
    }
    res.json(result);
  });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  db.query(
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
  const { user_id, product_id: productId } = req.body;
  try {
    //setCartId
    let cartId = await getCartId(user_id);
    cartId = cartId[0].id;
    //Check if item is duplicate
    let isDuplicate = await checkDuplicateItem(cartId, productId);
    isDuplicate = Object.values(isDuplicate[0])[0];
    //if duplicated item
    if (isDuplicate === 1) {
      return res.send({
        errorMessage: "이미 장바구니에 담긴 상품입니다",
      });
      //if not duplicated item
    } else if (isDuplicate === 0) {
      db.execute(
        "insert into cart_item (product_id, cart_id, quantity) values(?,?,?)",
        [productId, cartId, 2 + 1],
        (err, result) => {
          if (err) {
            return console.log(err);
          }
          return res.json("장바구니에 추가 되었습니다");
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCart = async (req, res) => {
  const { id } = req.query;
  try {
    let cartId = await getCartId(id);
    if (cartId[0]) {
      cartId = cartId[0].id;
    }

    if (cartId != 0) {
      db.execute(
        "select product_id from cart_item where cart_id = ?",
        [cartId],
        async (err, result) => {
          if (err) {
            return console.log(err);
          }
          //if no items in cartId
          else if (result.length === 0) {
            return res.send({
              errorMessage: "장바구니에 담긴 상품이 없습니다",
            });
          }
          //if items in cartId send data
          let productIds = [];
          result.map((product) => {
            productIds.push(product.product_id);
          });
          console.log(productIds);
          getCartItemInfo(res, productIds);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
