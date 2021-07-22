import { useEffect, useContext } from "react";
import axios from "axios";
import "./OrderButton.scss";
import { AuthContext } from "../Context";

const Button = (prop) => {
  const { authState } = useContext(AuthContext);

  const addCart = () => {
    if (authState) {
      axios
        .post("http://localhost:3001/cart", { id: authState.id })
        .then((res) => {
          if (res.data.errorMessage) {
            alert(res.data.errorMessage);
          }
          alert("장바구니에 추가 되었습니다");
        });
    }
  };

  return <button onClick={addCart}>{prop.text}</button>;
};

export default Button;
