import { useContext } from "react";
import axios from "axios";
import "./OrderButton.scss";
import { AuthContext } from "../Context";

const Button = (prop) => {
  const { authState } = useContext(AuthContext);

  const addCart = () => {
    if (authState) {
      axios
        .post("http://localhost:3001/cart", {
          user_id: authState.id,
          product_id: prop.productId,
          quantity: 1,
        })
        .then((res) => {
          if (res.data.errorMessage) {
            return alert(res.data.errorMessage);
          }
          alert(res.data);
        });
    }
  };

  return <button onClick={addCart}>장바구니 담기</button>;
};

export default Button;
