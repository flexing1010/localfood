import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { SidebarContext } from "../../Context";

import "./Sidebar.scss";

const Sidebar = () => {
  let history = useHistory();
  const { isShowing } = useContext(SidebarContext);
  const handleBrandClick = (brandId) => {
    history.push(`/by-brand/${brandId}`);
  };

  return (
    <div id="sidebar" className={isShowing ? "show-sidebar" : ""}>
      <ul>
        <li onClick={() => history.push("/")}>전체보기</li>
        <li onClick={() => handleBrandClick(1)}>Babolat</li>
        <li onClick={() => handleBrandClick(2)}>Wilson</li>
        <li onClick={() => handleBrandClick(3)}>Head</li>
        <li onClick={() => handleBrandClick(4)}>Yonex</li>
        <li onClick={() => handleBrandClick(5)}>Dunlop</li>
        <li onClick={() => handleBrandClick(6)}>Prince</li>
        <li onClick={() => handleBrandClick(7)}>TecniFibre</li>
        <li onClick={() => handleBrandClick(8)}>ProKennex</li>
      </ul>
    </div>
  );
};

export default Sidebar;
