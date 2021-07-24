import "./Cart.scss";
import HorizontalDisplay from "../components/HorizontalDisplay";
import DisplayVertical from "../components/DisplayVertical";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const Cart = () => {
  // const isWideScreen = useMediaQuery({ query: `(max-width:750px)` });
  let history = useHistory();
  const { authState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItem, setCartItem] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("장바구니를 사용하려면 로그인 해주십시오");
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/cart", { params: { id: authState.id } })
        .then((res) => {
          setErrorMessage(res.data.errorMessage);
          console.log(res.data);
          setCartItem(res.data);
        });
    }
    // eslint-disable-next-line
  }, [authState]);

  return (
    <div className="cart-container">
      {errorMessage ?? <span>{errorMessage}</span>}
      <div>{cartItem[0].product_name}</div>
      {/* {isWideScreen ? <DisplayVertical /> : <HorizontalDisplay />} */}
    </div>
  );
};

export default Cart;
