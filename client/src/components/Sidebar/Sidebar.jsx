import { useContext } from "react";
import { SidebarContext } from "../../Context";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isShowing } = useContext(SidebarContext);
  return (
    <div id="sidebar" className={isShowing ? "show-sidebar" : ""}>
      <ul>
        <li>전체보기</li>
        <li>Babolat</li>
        <li>Wilson</li>
        <li>Head</li>
        <li>Yonex</li>
        <li>Dunlop</li>
        <li>Prince</li>
        <li>TecniFibre</li>
        <li>ProKennex</li>
      </ul>
    </div>
  );
};

export default Sidebar;
