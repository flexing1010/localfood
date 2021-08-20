import { useHistory } from "react-router-dom";
import "./DisplayMyPage.scss";

const DisplayMyPage = ({ orders, orderItems, user }) => {
  let history = useHistory();

  return (
    <div className="mypage__container">
      <div className="my-info">
        <h2 className="my-info__name">안녕하세요 {user.name}님</h2>
        <div className="my-info__data">
          <div className="my-info__address">
            <h3>주소</h3>
            <span className="mypage__data--address1">{user.address1}</span>
            <span className="mypage__data--address2">{user.address2}</span>
          </div>

          <div className="mypage__data--email">
            <h3>이메일</h3>
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {orders.map((itemsArray, index) => {
        return (
          <div className="my-order" key={itemsArray.id}>
            <div className="my-order__order-info">
              <h2 className="my-order__order-info--orderAt">
                {itemsArray.createdAt}
              </h2>
              <ul className="my-order__order-list">
                {orderItems[index].map((item) => {
                  return (
                    <li key={item.id}>
                      <span
                        onClick={() =>
                          history.push(`/productdetails/${item.product_id}`)
                        }
                      >
                        {item.product_name}
                      </span>
                      <span>{`${item.price}원 ${item.quantity}개 `} </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="my-order__shipping-addr">
              <h2 className="shipping-addr--h2">배송지</h2>
              <div className="shipping-addr">
                <span>{user.address1}</span>
                <span>{user.address2}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayMyPage;
