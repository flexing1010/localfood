import { db } from "../db.js";

let cartId = async (user_id, callback) => {
  return db.query(
    "select id from cart where user_id = ?",
    [user_id],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null, result);
    }
  );
};

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
    "select * From product where id =?",
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
  const { user_id, product_id: productId } = req.body;

  cartId(user_id, async (err, cart_id) => {
    const cartId = await cart_id[0].id;
    db.query(
      "insert into cart_item (product_id, cart_id, quantity) values(?,?,?)",
      [productId, cartId, 2 + 1],
      (err, result) => {
        if (err && err.errno === 1062) {
          return res.send({
            errorMessage: "이미 장바구니에 담긴 상품입니다",
          });
        }
        return res.json("장바구니에 추가 되었습니다");
      }
    );
  });

  // if (id) {
  //   await db.query("select");
  // }
};

export const getCart = async (req, res) => {
  const { id } = req.query;

  cartId(id, async (err, cart_id) => {
    let cartId;
    if (cart_id.length != 0) {
      cartId = await cart_id[0].id;
    }
    if (err) {
      return console.log(err);
    } else if (cart_id != 0) {
      db.query(
        "select product_id from cart_item where cart_id = ?",
        [cartId],
        async (err, result) => {
          if (err) {
            return console.log(err);
          } else if (result.length === 0) {
            return res.send({
              errorMessage: "장바구니에 담긴 상품이 없습니다",
            });
          }
          let productIds = [];
          result.map((product) => {
            productIds.push(product.product_id);
          });
          db.query(
            "select * from product where id In (?)",
            [productIds],
            (err, result) => {
              if (err) {
                return console.log(err);
              }
              res.send(result);
            }
          );
        }
      );
    }
  });
};
// if (id) {
//   db.query(
//     "select id from cart where user_id =?",
//     [id],
//     async (err, result) => {
//       if (err) {
//         console.log("aa", result);
//         return res.send(console.log(err));
//       } else if (result.length != 0) {
//         await db.query(
//           "select * from cart_item where cart_id =?",
//           [result[0].id],
//           (err, result) => {
//             if (err) {
//               return res.send(console.log(err));
//             } else if (result.length === 0) {
//               return res.send({
//                 errorMessage: "장바구니에 담긴 상품이 없습니다.",
//               });
//             }
//             res.json(result);
//           }
//         );
//       }
//     }
//   );
// }
// };
