## 게시판 프로세스

### 게시판

- react draft wysiwyg 에디터를 사용하여 글을 작성할 수 있게 구현
- 관리자라면 작성글이 공지사항글인지 QnA글인지 선택할 수 있다(일반 사용자는 QnA글로 고정)
- 게시글의 작성자는 username(아이디)로 판별

```
client-side

  const submitPost = (e) => {
    e.preventDefault();
    axios.post("https://tennis365-api.herokuapp.com/board/create-post", {
        content,
        postTitle,
        username: authState.username,
        board_category: authState.isAdmin ? boardCategory : 1,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("글이 등록되었습니다");
          history.goBack();
        }
      });
  };
```

<br />

```
server-side

export const createPost = async (req, res) => {
  const postInfo = req.body;
  try {
    await insertPost(postInfo);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
```
