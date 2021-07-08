import "./MenuList.scss";
import Button from "./OrderButton";
import ProductVerticalDisplay from "./ProductVerticalDisplay";
// import ProductHorizontalDisplay from "./ProductHorizontalDisplay";
import { Link } from "react-router-dom";

const MenuList = () => {
  return (
    <div className="menuList__container">
      <Link to="/details">
        <ul className="menuList">
          <li className="menu">
            <ProductVerticalDisplay />
            <div className="menu__reservation">
              <Button text={"찜하기"} />
              <Button text={"주문하기"} />
            </div>
          </li>
          <li className="menu">
            <ProductVerticalDisplay />
            <div className="menu__reservation">
              <Button text={"찜하기"} />
              <Button text={"주문하기"} />
            </div>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default MenuList;
