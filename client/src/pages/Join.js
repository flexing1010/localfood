import "./Join.scss";
import { useState } from "react";
import axios from "axios";

const Join = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let errorMessage;
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
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        errorMessage = err.response.data.errorMessage;
        console.log(errorMessage);
      });
  };

  return (
    <div className="form-container">
      {errorMessage ? <span>{errorMessage} </span> : ""}
      <form action="">
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
        <input type="submit" value="Join" onClick={postJoin} />
      </form>
    </div>
  );
};

export default Join;
