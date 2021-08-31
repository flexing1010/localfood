import AddressInput from "../AdressInput/AdressInput";
import Input from "../Input/Input";
import {
  faBarcode,
  faCashRegister,
  faEnvelope,
  faIdCard,
  faLock,
  faMobileAlt,
  // faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./OrderForm.scss";
import useInputChanges from "../../hooks/useInputChanges";
import { useEffect, useState } from "react";
import usePostcode from "../../hooks/usePostcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoBox from "../InfoBox/InfoBox";
import Button from "../Button/Button";

const OrderForm = ({ orderInfo, orderItems, user }) => {
  const [initValues, setInitValues] = useState("");
  const [fullAddress, setFulladdress, handleComplete] = usePostcode();
  const { values, handleInputChange, setValues } = useInputChanges({});

  // const handleInputChange = (e) => {
  //   setInitValues(e.target.value);
  // };

  useEffect(() => {
    // if (user) {
    //   setInitValues({
    //     name: "",
    //     email: "",
    //     address2: "",
    //   });
    // }
    setValues({
      name: user.name,
      email: user.email,
      phoneNumber: "",
      address2: user.address2,
    });
    setFulladdress(user.address1);
    console.log(user);
  }, [user]);

  return (
    <form className="order-form">
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
          inputName={"phoneNumber"}
          inputPlaceholder={"연락처('-'을 제외하고 입력해주세요)"}
          inputType={"tel"}
          values={values.phoneNumber}
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
                key={item.id}
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
        </div>
        <Button text={"결제하기"} />
      </div>
    </form>
  );
};

export default OrderForm;
