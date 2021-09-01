import { useEffect } from "react";

const PaymentApi = ({ handleInputChange }) => {
  const { IMP } = window;
  IMP.init("imp83950599");
  //   const {
  //     pay_method,
  //     merchant_uid,
  //     amount,
  //     buyer_name,
  //     buyer_tel,
  //     buyer_email,
  //   } = values;
  //   const data={
  //     pay_method,
  //     merchant_uid
  //   }
  useEffect(() => {});
  return (
    <div className="iamport-container">
      <div className="pay-method">
        <span>결제방법</span>
        <div>
          <input
            type="radio"
            id="card"
            name="method"
            value="신용카드"
            onChange={handleInputChange}
          />
          <label htmlFor="card">신용카드</label>
        </div>
        {/* <div>
          <input
            type="radio"
            id="samsung"
            name="method"
            value="삼성페이"
            onChange={handleInputChange}
          />
          <label htmlFor="samsung">삼성페이</label>
        </div>
        <div>
          <input
            type="radio"
            id="kakaopay"
            name="method"
            value="카카오페이"
            onChange={handleInputChange}
          />
          <label htmlFor="kakaopay">카카오페이</label>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentApi;
