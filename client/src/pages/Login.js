import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const postLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        if (res.data.errorMessage) {
          alert(res.data.errorMessage);
        }
        localStorage.setItem("accessToken", res.data);
        setAuthState(true);
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
        <input
          name="username"
          placeholder="닉네임"
          type="text"
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Login;
