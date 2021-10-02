## 주문 프로세스

### 주문

```
client-side

  const toOrderPage = () => {
    axios
      .post("https://tennis365-api.herokuapp.com/order", {
        user_id: authState.id,
        grandTotal,
        orderItems: cartItems,
      })
      .then((res) => {
        history.push(`/order/${res.data.orderId}`);
      });
  };
```

- 장바구니 페이지에서 주문하기 버튼을 누르면 api로 주문 저장을 위한 post request를 보낸다.
- 요청이 완료되면 새로 저장된 주문 페이지로 이동한다.

<br/>

```
server-side

export const postOrder = async (req, res) => {
  const { user_id, grandTotal, orderItems } = req.body;
  let createdAt = new Date();

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
              item.product_id,
              item.quantity,
              item.price,
              item.product_name,
              item.stock,
              item.imgUrl
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
```
