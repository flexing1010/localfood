## 로그인 프로세스

### 로그인

```
  let { username, password } = req.body;
try {
  if (username && password) {
    let user = await getUserInfo(username, undefined);
    user = user[0];

    if (!user) {
      return res
        .status(400)
        .send({ errorMessage: "존재하지 않는 아이디입니다" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ errorMessage: "잘못된 비밀번호 입니다" });
    }

    const accessToken = sign(
      {
        username: user.username,
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    res.send({
      token: accessToken,
      isAdmin: user.isAdmin,
      username: user.username,
      id: user.id,
    });
  }
} catch (err) {
  console.log(err);
}
```

- req.body를 통해 프론트로 부터 아이디와 비밀번호를 받는다.
- 아이디와 비밀번호가 존재한다면 DB에서 해당 아이디를 가진 사용자를 찾아 그 정보를 user에 저장한다.
- DB에 사용자 정보가 없다면 에러 메시지와 함께 status code 400을 프론트엔드에 보낸다.
- 아이디가 있다면 bcrypt.compare를 통해 프로트로 부터 받은 비밀번호와 user에 저장된 비밀번호를 비교한다.
- 일치하지 않으면 401코드와 에러메시지를 보내고, 일치한다면 jwt로 accessToken을 생성하고 사용자 정보와 함께 프론트에 전달한다.
