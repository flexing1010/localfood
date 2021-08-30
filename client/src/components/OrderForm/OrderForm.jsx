import "./OrderForm.scss";

const OrderForm = ({ orderInfo, orderItems, user }) => {
  return (
    <form className="order-form">
      <div className="customer">
        <h2 className="customer__h2">구매자정보</h2>
        <table className="customer__table">
          <tbody>
            <tr>
              <td className="customer__col customer__col--1">이름</td>
              <td className="customer__col customer__col--2">{user.name}</td>
            </tr>
            <tr>
              <td className="customer__col customer__col--1">이메일</td>
              <td className="customer__col customer__col--2">{user.email}</td>
            </tr>
            <tr>
              <td className="customer__col customer__col--1">연락처</td>
              <input
                type="text"
                pattern="[0-9]"
                placeholder="'-' 없이 숫자만 입력해 주세요"
              />
            </tr>
          </tbody>
        </table>
      </div>
      <div className="order">
        <h2>상품정보</h2>
        {orderItems.map((item) => {
          return (
            <div className="order__info" key={item.id}>
              <div className="order__info1">{item.product_name}</div>
              <div className="order__info2">{`${item.quantity} 개`}</div>
            </div>
          );
        })}
      </div>
      <div className="checkout">
        <h2>결제정보</h2>
        <table>
          <tbody>
            <tr>
              <td className={"checkout__col checkout__col--1"}>결제금액</td>
              <td className={"checkout__col checkout__col--2"}>
                {orderInfo.grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button>결제하기</button>
    </form>
  );
};

export default OrderForm;
