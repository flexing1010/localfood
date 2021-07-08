import "./Cart.scss";
import Button from "../components/OrderButton";
import ProductHorizontalDisplay from "../components/ProductHorizontalDisplay";
import ProductVerticalDisplay from "../components/ProductVerticalDisplay";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const isWideScreen = useMediaQuery({ query: `(max-width:750px)` });

  return (
    <div className="cart-container">
      <div className="cart">
        {isWideScreen ? (
          <ProductVerticalDisplay />
        ) : (
          <ProductHorizontalDisplay />
        )}
        <div className="cart__price">
          <span>20,000원</span>
          <select name="quantity" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="cart__orderBtn">
          <Button text={"주문하기"} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
