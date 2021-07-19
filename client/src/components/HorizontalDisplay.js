import "./HorizontalDisplay.scss";
import { useContext } from "react";
import Button from "./OrderButton";
import { ProductContext } from "../Context";

const HorizontalDisplay = () => {
  const { products } = useContext(ProductContext);

  return (
    <ul className="horizontalDisplay">
      {products.map((product) => {
        return (
          <li className="menu--horizontal" key={product.product_id}>
            <div className="img--horizontal">
              <img src={product.imgUrl} alt="cart-img" />
            </div>
            <div className="menu__info--horiz">
              <h3>{product.product_name}</h3>
              <span>{product.restaurant}</span>
            </div>
            <div className="menu__price--horiz">
              <span>{product.price}</span>
              <select name="quantity" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="cart__orderBtn">
              <Button text={"주문하기"} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default HorizontalDisplay;
