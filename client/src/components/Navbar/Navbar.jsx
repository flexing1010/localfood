import "./Navbar.scss";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  const toMyPage = () => {
    history.push({
      pathname: `/user/${authState.id}`,
      state: { id: authState.id },
    });
  };

  return (
    <nav>
      <div className="title">
        <Link to="/">
          <img src={"/images/nav-logo.jpg"} alt="logo" />
        </Link>
        {/* <h1>Tennis365</h1> */}
      </div>
      <SearchBar />
      <ul>
        {!authState.status && (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
          </>
        )}
        {authState.isAdmin ? (
          <>
            <li>
              <Link to="/admin/post-item">상품등록</Link>
            </li>
            <li>
              <Link to="/admin/item-list">상품목록</Link>
            </li>
            <li>
              <Link to="/admin/user-list">유저목록</Link>
            </li>
            <li>
              <Link to="/admin/manage-order">주문관리</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
        )}
        {authState.status && (
          <>
            <li>
              <div onClick={toMyPage}>{authState.username}</div>
            </li>
            <li>
              <button onClick={logout}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
