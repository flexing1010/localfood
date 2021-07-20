import "./Cart.scss";
import HorizontalDisplay from "../components/HorizontalDisplay";
import VerticalDisplay from "../components/VerticalDisplay";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const isWideScreen = useMediaQuery({ query: `(max-width:750px)` });

  return (
    <div className="cart-container">
      {isWideScreen ? <VerticalDisplay /> : <HorizontalDisplay />}
    </div>
  );
};

export default Cart;
