import { useContext } from "react";
import { AuthContext } from "../../Context";
import { Link, useHistory } from "react-router-dom";
import "./Header.scss";
import Navbar from "../Navbar/Navbar";

const Header = () => {
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

  return (
    <header>
      <div className="top-nav">
        <div className="title">
          <Link to="/">
            <img src={"/images/nav-logo.jpg"} alt="logo" />
          </Link>
        </div>
        <ul>
          {!authState.status ? (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/join">회원가입</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logout}>로그아웃</button>
            </li>
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
          ) : null}
        </ul>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
