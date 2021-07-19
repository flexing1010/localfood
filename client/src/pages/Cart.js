import "./Cart.scss";
import Button from "../components/OrderButton";
import HorizontalDisplay from "../components/HorizontalDisplay";
import VerticalDisplay from "../components/VerticalDisplay";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const isWideScreen = useMediaQuery({ query: `(max-width:750px)` });

  return (
    <div className="cart-container">
      {isWideScreen ? <VerticalDisplay /> : <HorizontalDisplay />}
      {/* <div className="cart__price">
          <span>20,000원</span>
          <select name="quantity" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="cart__orderBtn">
          <Button text={"주문하기"} />
        </div> */}
    </div>
  );
};

export default Cart;
