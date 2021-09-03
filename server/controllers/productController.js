import { db } from "../db.js";
import {
  getCartId,
  checkDuplicateItem,
  deleteItem,
  getAllProducts,
  getAProduct,
  getProductImgs,
  getItemsByBrand,
  insertReview,
  // insertProductReview,
  selectReviews,
  deleteReview,
  // getCartItemInfo,
} from "../queries/productQuery.js";

export const home = async (req, res) => {
  try {
    const productList = await getAllProducts();
    res.json(productList);
  } catch (err) {
    console.log(err);
  }
  // db.execute("SELECT * FROM product",  (err, result) => {
  //   const productList = result;
  //   if (err) {
  //     return res.send(console.log(err));
  //   }
  //   res.json(productList);
  // });
};

export const viewProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getAProduct(id);
    const productImgs = await getProductImgs(id);
    // console.log(productImgs[0]);
    res.send({ product, productImgs });
  } catch (err) {
    console.log(err);
  }
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
        [productId, cartId, 1],
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
        "select * from cart_item where cart_id = ?",
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

          db.execute(
            "select product.product_name,product.brand, product.rating, product.price, product.imgUrl,product.stock, cart_item.quantity, cart_item.cart_id,cart_item.id, cart_item.product_id from product join cart_item on product.id = cart_item.product_id ",
            (err, result) => {
              const cartItems = result.filter(
                (item) => item.cart_id === cartId
              );
              res.send(cartItems);
            }
          );
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItem = async (req, res) => {
  const cartItemId = req.body.targetId;

  try {
    await deleteItem(cartItemId);
    res.json("상품이 장바구니에서 삭제되었습니다");
  } catch (err) {
    console.log(err);
  }
};

export const viewByBrand = async (req, res) => {
  const { id } = req.params;
  const brandItemsId = await getItemsByBrand(id);
};

export const postReview = async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  try {
    const insertedReview = await insertReview(review, id);
    res.json(insertedReview.insertId);
  } catch (err) {
    console.log(err);
  }
};

export const getReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const reviews = await selectReviews(id);
    console.log(reviews);
    res.json(reviews);
  } catch (err) {
    console.log(err);
  }
};

export const deleteItemReview = async (req, res) => {
  const { targetId } = req.body;
  try {
    await deleteReview(targetId);

    res.send({ success: "삭제되었습니다" });
  } catch (err) {
    console.log(err);
  }
};
