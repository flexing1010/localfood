import "./VerticalDisplay.scss";
import { useContext } from "react";
import { ProductContext } from "../Context";
import Button from "./OrderButton";
import { useHistory } from "react-router-dom";

const VerticalDisplay = () => {
  const { products } = useContext(ProductContext);
  let history = useHistory();

  return (
    <ul className="verticalDisplay">
      {products.map((product) => {
        return (
          <li
            className="menu"
            onClick={() => {
              history.push(`/productdetails/${product.product_id}`);
            }}
            key={product.product_id}
          >
            <div className="menu__img">
              <img src={product.imgUrl} alt="menu-imgs" />
            </div>
            <div className="menu__description">
              <h2>{product.product_name}</h2>
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
