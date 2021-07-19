import { useContext } from "react";
import "./VerticalDisplay.scss";
import Button from "./OrderButton";
import { ProductContext } from "../Context";

const VerticalDisplay = () => {
  const { products } = useContext(ProductContext);

  return (
    <ul className="verticalDisplay">
      {products.map((product) => {
        return (
          <li className="menu" key={product.product_id}>
            <div className="menu__img">
              <img src={product.imgUrl} alt="menu-imgs" />
            </div>
            <div className="menu__description">
              <h2>{product.product__name}</h2>
              <small>{product.restaurant}</small>
              <small>{product.rating}</small>
              <span>{product.price}</span>
            </div>
            <div className="menu__reservation">
              <Button text={"찜하기"} />
            </div>
          </li>
        );
      })}
      {/* {products ? (
        <div className="menu__img">
          <img src={products.imgUrl} alt="menu-imgs" />
        </div>
      ) : (
        <div>ggg</div>
      )} */}
    </ul>
  );
};

export default VerticalDisplay;
