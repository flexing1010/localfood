import { db } from "../db.js";
import {
  getCartId,
  checkDuplicateItem,
  deleteItem,
  insertOrderItem,
  // getCartItemInfo,
} from "../queries/productQuery.js";
import { getUserInfo } from "../queries/userQuery.js";

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
            "select product.product_name,product.brand, product.rating, product.price, product.imgUrl, cart_item.quantity, cart_item.cart_id,cart_item.id from product join cart_item on product.id = cart_item.product_id ",
            (err, result) => {
              const cartItems = result.filter(
                (item) => item.cart_id === cartId
              );
              res.send(cartItems);
            }
          );

          // let productIds = [];
          // result.map((product) => {
          //   productIds.push(product.product_id);
          // });
          // console.log(productIds);
          // getCartItemInfo(res, productIds);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// export const updateQuantity = async (req, res) => {};

export const deleteCartItem = async (req, res) => {
  const cartItemId = req.body.targetId;

  try {
    await deleteItem(cartItemId);
    res.json("상품이 장바구니에서 삭제되었습니다");
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  const { username } = req.query;
  try {
    let user = await getUserInfo(username);
    user = user[0];
    if (user.password) {
      delete user.password;
    }
    if (user) {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

export const postOrder = async (req, res) => {
  const { user_id, grandTotal, orderItems } = req.body;
  let createdAt = new Date();
  console.log(orderItems);
  createdAt =
    createdAt.getFullYear() +
    "-" +
    (createdAt.getMonth() + 1) +
    "-" +
    createdAt.getDate();

  try {
    db.execute(
      "insert into orders (createdAt, grandTotal, user_id) Values(?,?,?)",
      [createdAt, grandTotal, user_id],
      async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          await orderItems.forEach((item) => {
            insertOrderItem(
              result.insertId,
              item.id,
              item.quantity,
              item.price,
              item.product_name
            );
          });

          res.send({ orderId: result.insertId });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
