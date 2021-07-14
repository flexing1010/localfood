import "./Join.scss";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const postJoin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/join", {
        name,
        username,
        email,
        password,
        passwordConfirm,
      })
      .then((response) => {
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
        <input
          name="name"
          placeholder="이름"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
        <input
          name="username"
          placeholder="닉네임"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          name="email"
          placeholder="이메일"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <input
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          required
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Join;
