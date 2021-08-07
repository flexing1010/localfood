import "./Cart.scss";

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
// import { useMediaQuery } from "react-responsive";
import axios from "axios";
import DisplayCart from "../../components/DisplayCart/DisplayCart";
import Button from "../../components/Button/Button";

const Cart = () => {
  let history = useHistory();
  const { authState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");

  const handleDelete = (url, product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      axios
        .delete(url, {
          data: {
            targetId: exist.id,
          },
        })
        .then((res) => {
          console.log(res);
          setCartItems(cartItems.filter((item) => item.id !== exist.id));
          alert(res.data);
        });
    }
  };

  const handleQuantity = (product, value) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      console.log("Aa");
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, quantity: value } : item
        )
      );
    } else {
      console.log("Bb");
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    console.log(exist, cartItems);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("장바구니를 사용하려면 로그인 해주십시오");
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/cart", { params: { id: authState.id } })
        .then((res) => {
          if (res.data.errorMessage) {
            setErrorMessage(res.data.errorMessage);
          }
          setCartItems(res.data);
        });
    }
    // eslint-disable-next-line
  }, [authState]);

  useEffect(() => {
    if (!errorMessage) {
      const init = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
      setGrandTotal(init);
    }
  }, [grandTotal, cartItems, errorMessage]);

  const toOrderPage = () => {
    axios
      .post("http://localhost:3001/order", {
        user_id: authState.id,
        grandTotal,
        orderItems: cartItems,
      })
      .then((res) => {
        history.push(`/order/${res.data.orderId}`);
      });
  };

  return (
    <section className="cart">
      {errorMessage || cartItems.length === 0 ? (
        <span>장바구니에 담긴 상품이 없습니다</span>
      ) : null}
      <ul className="cart-items">
        {!errorMessage && (
          <DisplayCart
            errorMessage={errorMessage}
            cartItems={cartItems}
            handleQuantity={handleQuantity}
            handleDelete={handleDelete}
          />
        )}

        {/* {cartItems.map((item) => {
          return (
            <DisplayCart
              key={item.id}
              item={item}
              handleQuantity={handleQuantity}
              sendTotalToCart={sendTotalToCart}
            />
          );
        })} */}
      </ul>
      <div className="cart-items__total">
        {errorMessage || cartItems.length === 0 ? null : grandTotal}
      </div>
      <div className="cart-items__orderBtn">
        <Button handleBtnClick={toOrderPage} text={"주문하기"} />
      </div>
    </section>
  );
};

export default Cart;