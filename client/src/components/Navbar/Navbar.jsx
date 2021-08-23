import "./Navbar.scss";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../Context";
import SearchBar from "../SearchBar/SearchBar";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  let history = useHistory();

  const toMyPage = () => {
    history.push({
      pathname: `/user/${authState.id}`,
      state: { id: authState.id },
    });
  };

  return (
    <div className="nav-container">
      <nav className="bottom-nav">
        <ul className="bottom-nav__ul">
          <li className="fa-icon fa-bars">
            <FontAwesomeIcon icon={faBars} />
          </li>
          <SearchBar />
          {!authState.isAdmin && (
            <>
              <li>
                <Link to="/cart">
                  <div className="fa-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                </Link>
              </li>
              <li>
                <div onClick={toMyPage} className="username">
                  {authState.username}
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
