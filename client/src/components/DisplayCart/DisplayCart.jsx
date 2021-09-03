import "./DisplayCart.scss";

import ProductImg from "../ProductImg/ProductImg";

const DisplayCart = ({ cartItems, handleQuantity, handleDelete }) => {
  return (
    <>
      {cartItems.map((item) => {
        return (
          <li className="cart_item" key={item.id}>
            <div className="img-description">
              <ProductImg item={item} class={"cart__img"} />

              <div className="cart__description">
                <strong className="item-name">{item.product_name}</strong>
                <span>{item.brand}</span>
                {/* <div className="rating">
                  <span>평점</span>
                  <span>{item.rating}</span>
                </div> */}
                <div className="item__price">
                  <span className="info-title">판매가</span>
                  <span>{`${item.price.toLocaleString()}원`}</span>
                </div>
                <div className="item__quantity">
                  <div className="info-title">수량</div>
                  <input
                    min={1}
                    max={item.stock}
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
                <div className="item__total">
                  <span className="info-title">합계</span>
                  <span id={item.id}>
                    {item.quantity * parseInt(item.price)}
                  </span>
                </div>
                <div
                  className="delete-btn"
                  onClick={() =>
                    handleDelete("http://localhost:3001/cart/update", item)
                  }
                >
                  삭제하기
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
