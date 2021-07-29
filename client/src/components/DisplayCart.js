import "./DisplayCart.scss";

import React, { useEffect, useRef, useState } from "react";

const DisplayCart = ({ item, sendTotalToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState("");
  const cartTotal = useRef(null);

  const changeQuantity = (e) => {
    let [value] = e.target.value;
    setQuantity(value);
  };

  useEffect(() => {
    console.log("aa");
    setItemTotal(cartTotal.current.innerText);
    if (itemTotal) {
      sendTotalToCart(item.id, parseInt(itemTotal));
    }
  }, [quantity]);

  // useEffect(() => {
  //   if (itemTotal) {
  //     sendTotalToCart(item.id, parseInt(itemTotal));
  //   }
  //   console.log();
  // }, []);

  return (
    <li className="cart_item">
      <div className="img-description">
        <div className="cart__img">
          <img src={item.imgUrl} alt="menu-imgs" />
        </div>
        <div className="cart__description">
          <h2>{item.product_name}</h2>
          <span>{item.brand}</span>
          <div className="rating">
            <span>평점</span>
            <span>{item.rating}</span>
          </div>
          <div className="item__price">
            <span>판매가</span>
            <span>{item.price}</span>
          </div>
          <div className="item__quantity">
            <small>수량</small>
            <input
              value={quantity}
              name={`quantity_id_${item.id}`}
              onChange={changeQuantity}
              type="number"
              placeholder="수량"
            />
          </div>
          <div>
            <span>합계</span>
            <span ref={cartTotal} id={item.id}>
              {quantity * parseInt(item.price)}
            </span>
          </div>
        </div>
      </div>
      <div className="price-quantity"></div>
    </li>
  );
};

export default DisplayCart;
