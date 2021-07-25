import "./Cart.scss";
import DisplayHorizontal from "../components/DisplayHorizontal";
import DisplayVertical from "../components/DisplayVertical";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const Cart = () => {
  const isSmallScreen = useMediaQuery({ query: `(max-width:750px)` });
  let history = useHistory();
  const { authState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

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
          setCartItems(res.data);
        });
    }
    // eslint-disable-next-line
  }, [authState]);

  return (
    <section className="cart">
      {errorMessage ?? <span>{errorMessage}</span>}
      {/* {cartItems.map((cartItem) => {
        return <div>{cartItem.product_name}</div>;
      })} */}
      <ul className={isSmallScreen ? "verticalDisplay" : "horizontalDisplay"}>
        {/* {isSmallScreen ? <DisplayVertical product={cartItems}/> : <DisplayHorizontal product={cartItems} />} */}
        {isSmallScreen ? (
          cartItems.map((item) => {
            return <DisplayVertical product={item} key={item.id} />;
          })
        ) : (
          <div></div>
        )}
        {!isSmallScreen &&
          cartItems.map((item) => {
            return <DisplayHorizontal product={item} key={item.id} />;
          })}
      </ul>
    </section>
  );
};

export default Cart;
