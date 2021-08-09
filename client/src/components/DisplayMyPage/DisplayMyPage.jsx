import { useEffect } from "react";
import "./DisplayMyPage.scss";

const DisplayMyPage = ({ orders, orderItems, user }) => {
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <div className="mypage">
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

      {/* {orders.map((itemsArray, index) => {
        return (
          <div className="my-order">
            <div className="my-order__order-info">
              <h2 className="my-order__order-info--orderAt">
                {itemsArray.createdAt}
              </h2>
            </div>
            <div className="my-order__shipping-addr"></div>
          </div>
        );
      })} */}
      {/* {orders.length !== 0 &&
        orders.map((item) => {
          return <div>{item.id}</div>;
        })} */}
    </div>
  );
};

export default DisplayMyPage;
