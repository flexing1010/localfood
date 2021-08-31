import "./Join.scss";
import axios from "axios";
import Input from "../../components/Input/Input";
// import Modal from "../../components/Modal/Modal";
// import DaumPostcode from "react-daum-postcode";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faLock,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import usePostcode from "../../hooks/usePostcode";
import useModal from "../../hooks/useModal";
import useInputChanges from "../../hooks/useInputChanges";
import AddressInput from "../../components/AdressInput/AdressInput";

const Join = () => {
  const initValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address2: "",
  };

  const { values, handleInputChange } = useInputChanges(initValues);

  const [fullAddress, setFulladdress, handleComplete] = usePostcode();
  // const [address2, setAddress2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, openModal, closeModal] = useModal();
  let history = useHistory();

  const postJoin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/join", {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        address1: fullAddress,
        address2: values.address2,
      })
      .then((response) => {
        console.log(fullAddress);
        console.log("success");
        history.push("/login");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.errorMessage);
        }
      });
  };

  return (
    <div className="form-container">
      {errorMessage && <span>{errorMessage}</span>}
      <form
        action="http://localhost:3001/join"
        method="POST"
        onSubmit={postJoin}
      >
        <Input
          inputIcon={faUser}
          inputName={"name"}
          inputPlaceholder={"이름"}
          inputType={"text"}
          values={undefined}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faIdCard}
          inputName={"username"}
          values={undefined}
          inputPlaceholder={"아이디"}
          inputType={"text"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faEnvelope}
          inputName={"email"}
          values={undefined}
          inputPlaceholder={"이메일"}
          inputType={"email"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faLock}
          inputName={"password"}
          values={undefined}
          inputPlaceholder={"비밀번호"}
          inputType={"password"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faLock}
          inputName={"passwordConfirm"}
          values={undefined}
          inputPlaceholder={"비밀번호 확인"}
          inputType={"password"}
          inputOnChange={handleInputChange}
        />
        <AddressInput
          handleInputChange={handleInputChange}
          handleComplete={handleComplete}
          fullAddress={fullAddress}
          address2={undefined}
        />
        {/* <div className="address">
          <div className="address__icon">
            <FontAwesomeIcon className="fa-icon" icon={faMapMarkerAlt} />
          </div>
          <div className="address__input">
            <div className="find-address">
              <input readOnly type="text" name="address1" value={fullAddress} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                주소찾기
              </button>
              <Modal open={modalOpen} close={closeModal} header="주소찾기">
                <DaumPostcode
                  // autoClose={true}
                  onComplete={(e) => {
                    handleComplete(e);
                    closeModal();
                  }}
                  style={{ height: 500 }}
                />
              </Modal>
            </div>
            <div className="detail-address">
              <input
                type="text"
                name="address2"
                placeholder="상세주소"
                // value={address2}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div> */}

        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default Join;
