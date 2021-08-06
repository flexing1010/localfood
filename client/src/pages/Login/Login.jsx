import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
import Input from "../../components/Input/Input";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const initValues = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initValues);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("dd", values);
  };

  const postLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.data.errorMessage) {
          alert(res.data.errorMessage);
        }
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        history.push("/");
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
      <form action="" onSubmit={postLogin}>
        <Input
          inputIcon={faIdCard}
          inputName={"username"}
          inputPlaceholder={"아이디"}
          inputType={"text"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faLock}
          inputName={"password"}
          inputPlaceholder={"비밀번호"}
          inputType={"password"}
          inputOnChange={handleInputChange}
        />

        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default Login;
