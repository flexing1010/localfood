import "./MenuList.scss";
import VerticalDisplay from "./VerticalDisplay";
import { Link } from "react-router-dom";

const MenuList = () => {
  return (
    <div className="menuList__container">
      <Link to="/details">
        <VerticalDisplay />
      </Link>
    </div>
  );
};

export default MenuList;
