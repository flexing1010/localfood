// import "./Join.scss";

const Join = () => {
  return (
    <div className="form-container">
      <form action="">
        <input name="name" placeholder="이름" type="text" required />
        <input name="username" placeholder="닉네임" type="text" required />
        <input name="email" placeholder="이메일" type="email" required />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          required
        />
        <input
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          required
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Join;
