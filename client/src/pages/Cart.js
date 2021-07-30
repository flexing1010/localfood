import "./Cart.scss";
// import DisplayHorizontal from "../components/DisplayHorizontal";
// import DisplayVertical from "../components/DisplayVertical";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import DisplayCart from "../components/DisplayCart";

const Cart = () => {
  let history = useHistory();
  // const totalRef = useRef({ init: 0 });

  const { authState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  // const isSmallScreen = useMediaQuery({ query: `(max-width:750px)` });

  const [itemTotals, setItemTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const sendTotalToCart = (id, total) => {
    if (total) {
      setItemTotal({
        ...itemTotals,
        [id]: total,
      });
    }
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
    console.log(cartItems);
    if (itemTotals) {
      const total = Object.values(itemTotals).reduce(
        (accumulator, currentVal) => accumulator + currentVal
      );
      setGrandTotal(total);
    }
  }, [itemTotals, grandTotal]);

  return (
    <section className="cart">
      <ul className="cart-items">
        {cartItems.map((item) => {
          return (
            <DisplayCart
              key={item.id}
              item={item}
              sendTotalToCart={sendTotalToCart}
            />
          );
        })}
      </ul>
      <div className="cart-items__total">{grandTotal}</div>

      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default Cart;
