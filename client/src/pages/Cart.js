import "./Cart.scss";
import DisplayHorizontal from "../components/DisplayHorizontal";
import DisplayVertical from "../components/DisplayVertical";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const Cart = () => {
  // const isSmallScreen = useMediaQuery({ query: `(max-width:750px)` });
  let history = useHistory();
  const { authState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const quantityInput = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("장바구니를 사용하려면 로그인 해주십시오");
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/cart", { params: { id: authState.id } })
        .then((res) => {
          setErrorMessage(res.data.errorMessage);
          console.log(res.data.errorMessage);
          setCartItems(res.data);
        });
    }
    // eslint-disable-next-line
  }, [authState]);

  return (
    <section className="cart">
      <ul className="cart-items">
        {cartItems.map((item) => {
          return (
            <li>
              <div className="img-description">
                <div className="cart__img">
                  <img src={item.imgUrl} alt="menu-imgs" />
                </div>
                <div className="cart__description">
                  <h2>{item.product_name}</h2>
                  <span>{item.brand}</span>
                  <span>{item.rating}</span>
                  <span>{item.price}</span>
                  <input
                    ref={quantityInput}
                    name={`quantity_id_${item.id}`}
                    onChange={(e) => {
                      let value = e.target.value;
                      //수량에 따른 합계 계산 기능 ///////
                      setQuantity({
                        ...quantity,
                        [e.target.name]: parseInt(value++),
                      });
                      // console.log(quantity.quantity_id_1);
                      // const inputName = quantityInput.current.name;
                      // console.log(quantity.setErrorMessageinputName);
                    }}
                    type="number"
                    placeholder="수량"
                  />
                  <div>
                    <span>합계</span>
                    <span>
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(quantity.quantity_id_1 * parseInt(item.price))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-quantity"></div>
            </li>
          );
        })}
      </ul>

      {/* {!errorMessage ? (
        <>
          <ul
            className={isSmallScreen ? "verticalDisplay" : "horizontalDisplay"}
          >
            {isSmallScreen ? (
              cartItems.map((item) => {
                return <DisplayVertical product={item} key={item.id} />;
              })
            ) : (
              <div></div>
            )}
            {!isSmallScreen &&
              cartItems.map((item) => {
                return <DisplayHorizontal product={item} key={item.id} />;
              })}
          </ul>
        </>
      ) : (
        <span>{errorMessage}</span>
      )}
     
    */}
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default Cart;
