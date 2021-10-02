## 회원가입 프로세스

### 회원가입

```
  let { name, username, email, password, passwordConfirm, address1, address2 } =
    req.body;

  if (password != passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 다릅니다",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 5);
  await db.execute(
    "INSERT INTO user (name, username, email, password,address1,address2) VALUES(?,?,?,?,?,?)",
    [name, username, email, encryptedPassword, address1, address2],
    (err, result) => {
      if (err) {
        console.log(err);
        if (err.errno === 1062) {
          return res
            .status(400)
            .send({ errorMessage: "이미 존재하는 닉네임/이메일 입니다" });
        }
      } else {
        db.execute("Insert into cart (user_id) values(?)", [result.insertId]);
        res.send("Values Inserted");
      }
    }
  );
```

- req.body를 통해 프로트엔드로 부터 필요한 정보를 받는다.
- 먼저 비밀번호와 비밀번호 확인이 일치하는지 검사하고 아니면 400코드와 에러메시지를 일치한다면 bcrypt.hash를 통해 비밀번호를 암호화 한다.
- 암호화한 비밀번호를 포함한 모든 회원가입 정보를 DB에 저장한다.
- 중복된 아이디나 이메일이 있다면(1062 unique값 중복 에러) 에러메시지를 보낸다.
- 성공적으로 DB에 저장됐다면 해당 사용자의 id값을 가진 cart를 생성한다.
