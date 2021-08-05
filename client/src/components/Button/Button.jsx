import "./Button.scss";

// import { useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../Context";

const Button = (props) => {
  return <button onClick={props.handleBtnClick}>{props.text}</button>;
};

export default Button;
