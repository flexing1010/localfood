import "./MenuList.scss";
import Button from "./OrderButton";
import { Link } from "react-router-dom";

const MenuList = () => {
  return (
    <div className="menuList__container">
      <Link to="/details">
        <ul className="menuList">
          <li className="menu">
            <div className="menu__img">
              <img src="/images/1.jpg" alt="menu-img" />
            </div>
            <div className="menu__description">
              <h2>불막창</h2>
              <small>곱분이 곱창</small>
              <small>4.5/5</small>
            </div>
            <div className="menu__reservation">
              <span>20,000원</span>
              <Button text={"예약하기"} />
            </div>
          </li>
          <li className="menu">
            <div className="menu__img">
              <img src="/images/1.jpg" alt="menu-img" />
            </div>
            <div className="menu__description">
              <h2>불막창</h2>
              <small>곱분이 곱창</small>
              <small>4.5/5</small>
            </div>
            <div className="menu__reservation">
              <span>20,000원</span>
              <button>장바구니</button>
            </div>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default MenuList;
