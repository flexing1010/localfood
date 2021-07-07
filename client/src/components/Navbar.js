import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>로컬푸드</h1>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/search">검색</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/join">회원가입</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;