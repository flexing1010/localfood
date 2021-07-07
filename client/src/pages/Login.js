const Login = () => {
  return (
    <div className="form-container">
      <form action="">
        <input name="username" placeholder="닉네임" type="text" required />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          required
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Login;
