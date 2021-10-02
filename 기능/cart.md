## 장바구니 프로세스

### 장바구니

```
client-side

  const addCart = () => {
    if (product.stock === 0) {
      return alert("품절된 상품입니다");
    }
    if (!localStorage.getItem("accessToken") || authState.status === false) {
      return alert("장바구니를 사용하려면 로그인 하셔야 합니다");
    } else {
      axios
        .post("https://tennis365-api.herokuapp.com/cart", {
          user_id: authState.id,
          product_id: product.id,
          quantity: 1,
        })
        .then((res) => {
          if (res.data.errorMessage) {
            return alert(res.data.errorMessage);
          }
          alert(res.data);
        });
    }
  };
```

- 상품 상세정보 페이지에서 장바구니 담기버튼을 누르면 먼저 재고가 0인지 확인하고 0이라면 품절이라는 메시지를 보낸다.
- 그 다음 사용자가 로그인 되어있는지 확인한 후 아니라면 로그인 화면으로 이동한다.
- 로그인 됐다면 필요한 정보들과 함께 api로 post request를 보낸다.

<br />
<br />

```
server-side

  const { user_id, product_id: productId } = req.body;
  try {
    let cartId = await getCartId(user_id);
    if (cartId[0] !== 0) {
      cartId = cartId[0].id;
    }

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
```

- 해당 user_id를 가진 사용자에게 귀속된 cart id를 찾는다.
- 장바구니에 중복된 상품이 있는지 확인한 후 있다면 에러 메시지를 보낸다.
- 중복된 상품이 없다면 장바구니-상품 테이블에 상품정보를 저장한다.
