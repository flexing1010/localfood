import "./DisplayCart.scss";

import React, { useEffect, useRef, useState } from "react";
import ProductImg from "../ProductImg/ProductImg";

const DisplayCart = ({ cartItems, handleQuantity, handleDelete }) => {
  useEffect(() => {
    console.log(cartItems, "dd");
  }, []);

  return (
    <>
      {cartItems.map((item) => {
        return (
          <li className="cart_item" key={item.id}>
            <div
              onClick={() =>
                handleDelete("http://localhost:3001/cart/update", item)
              }
            >
              ❎
            </div>
            <div className="img-description">
              <ProductImg item={item} class={"cart__img"} />
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
                    min={1}
                    value={item.quantity}
                    name={`quantity_id_${item.id}`}
                    // onChange={changeQuantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleQuantity(item, value);
                    }}
                    type="number"
                    placeholder="수량"
                  />
                </div>
                <div>
                  <span>합계</span>
                  <span id={item.id}>
                    {item.quantity * parseInt(item.price)}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default DisplayCart;
