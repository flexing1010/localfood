import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const postLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        console.log("success");
        console.log(res);
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
