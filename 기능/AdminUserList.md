## 유저목록 프로세스

### 유저목록

- 토스트 그리드 라이브러리를 사용하여 주문정보들을 표시
- 사용자의 권한정보(일반/관리자)를 수정가능

```
client-side

  const handleClick = async () => {
    if (instance.getCheckedRows().length < 1) {
      alert("선택된 사용자가 없습니다.");
      return;
    } else {
      await axios
        .patch(
          "https://tennis365-api.herokuapp.com/admin/user-list",
          instance.getCheckedRows()
        )
        .then((res) => {
          alert("업데이트 됐습니다");
          instance.uncheckAll();
        });
    }
  };
```

```
server-side

export const patchIsAdmin = async (req, res) => {
  const newIsAdminInfo = req.body;
  const filteredArray = newIsAdminInfo.map((item) => {
    return (({ username, isAdmin }) => ({ username, isAdmin }))(item);
  });

  try {
    filteredArray.forEach(async (item) => {
      await updateIsAdmin(item);
    });
    console.log("successss");
    res.send();
  } catch (err) {
    console.log(err);
  }
};
```
