import "./Cart.scss";
import HorizontalDisplay from "../components/HorizontalDisplay";
import DisplayVertical from "../components/DisplayVertical";
import { useContext } from "react";
import { ProductContext } from "../Context";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const isWideScreen = useMediaQuery({ query: `(max-width:750px)` });
  // const { products } = useContext(ProductContext);

  return (
    <div className="cart-container">
      {isWideScreen ? <DisplayVertical /> : <HorizontalDisplay />}
    </div>
  );
};

export default Cart;
