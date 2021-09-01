import AddressInput from "../AdressInput/AdressInput";
import Input from "../Input/Input";
import "./OrderForm.scss";
import useInputChanges from "../../hooks/useInputChanges";
import { useEffect } from "react";
import usePostcode from "../../hooks/usePostcode";
import InfoBox from "../InfoBox/InfoBox";
import Button from "../Button/Button";
import PaymentApi from "../PaymentApi/PaymentApi";
import {
  faBarcode,
  faCashRegister,
  faEnvelope,
  faMobileAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const OrderForm = ({ orderInfo, orderItems, user }) => {
  const [fullAddress, setFulladdress, handleComplete] = usePostcode();
  const { values, handleInputChange, setValues } = useInputChanges({});

  const submitOrder = (e) => {
    e.preventDefault();
    const data = {
      pay_method: values.method,
      merchant_uid: `min_${new Date().getTime()}`,
      amount: orderInfo.grandTotal,
      buyer_name: values.name,
      buyer_tel: values.buyer_tel,
      buyer_email: values.email,
    };
    const { IMP } = window;
    IMP.init("imp83950599");

    IMP.request_pay(data, (response) => {
      console.log(response);
      if (response.success) {
        console.log(data);
      } else {
        console.log(response);
      }
    });
    console.log(data);
  };

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      buyer_tel: "",
      address2: user.address2,
    });
    setFulladdress(user.address1);
    console.log(user);
  }, [user]);

  return (
    <form className="order-form" onSubmit={submitOrder}>
      <div className="customer">
        <h2 className="customer__h2">받는사람정보</h2>
        <Input
          inputIcon={faUser}
          inputName={"name"}
          inputPlaceholder={"이름"}
          inputType={"text"}
          values={values.name}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faEnvelope}
          inputName={"email"}
          inputPlaceholder={"이메일"}
          inputType={"email"}
          values={values.email}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faMobileAlt}
          inputName={"buyer_tel"}
          inputPlaceholder={"연락처('-'을 제외하고 입력해주세요)"}
          inputType={"tel"}
          values={values.buyer_tel}
          inputOnChange={handleInputChange}
        />
        <AddressInput
          address2={values.address2}
          handleInputChange={handleInputChange}
          handleComplete={handleComplete}
          fullAddress={fullAddress}
        />
      </div>
      <div className="order-checkout">
        <div className="order">
          <h2>상품정보</h2>
          {orderItems.map((item) => {
            return (
              <InfoBox
                propsKey={item.id}
                faIcon={faBarcode}
                infoText={`${item.product_name}`}
                additionalInfo={`${item.quantity} 개`}
              />
            );
          })}
        </div>
        <div className="checkout">
          <h2>결제정보</h2>
          <InfoBox
            faIcon={faCashRegister}
            infoText={`결제금액 ${orderInfo.grandTotal}원`}
          />
          <PaymentApi handleInputChange={handleInputChange} />
        </div>
        <Button text={"결제하기"} />
      </div>
    </form>
  );
};

export default OrderForm;
