## 댓글/리뷰 프로세스

- 게시판의 댓글과 상품의 리뷰는 거의 동일한 프로세스를 가지고 있다.
- 리뷰/댓글 작성 버튼을 누르면 모달창이 뜬다.
- 모달창에 내용을 작성후 등록 버튼을 누르면 서버로 필요 정보들을 전달
- 해당 리뷰/댓글은 본인만 수정/삭제 가능

```
client-side
  const postReview = (e) => {
    e.preventDefault();
    let createdAt = new Date();
    createdAt =
      createdAt.getFullYear() +
      "-" +
      (createdAt.getMonth() + 1) +
      "-" +
      createdAt.getDate();

    closeModal();

    axios
      .post(`https://tennis365-api.herokuapp.com/view/${id}/review`, {
        reviewBody,
        createdAt,
        username: authState.username,
      })
      .then((response) => {
        // setTemporaryId(response.data);
        const newReview = {
          review_body: reviewBody,
          createdAt,
          username: authState.username,
          id: response.data,
        };
        setReviews([newReview, ...reviews]);
      });
  };
```

```
server-side
export const createComment = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  try {
    const insertedComment = await insertComment(comment, id);
    res.json(insertedComment.insertId);
  } catch (err) {
    console.log(err);
  }
};
```
