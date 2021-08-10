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
        <img src={"/images/nav-logo.jpg"} alt="logo" />
        {/* <h1>Tennis365</h1> */}
      </div>
      <SearchBar />
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>

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
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
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
