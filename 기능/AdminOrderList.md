##주문관리 프로세스 ###주문관리

- 토스트 그리드 라이브러리를 사용하여 주문정보들을 표시
- 주문번호를 클릭하면 자세한 정보가 모달창에 표시
- 상품 주문 현황 수정 가능

```
client-side

  const updateStatus = async () => {
    if (instance.getCheckedRows().length < 1) {
      alert("변경할 주문을 선택 해주세요.");
      return;
    } else {
      await axios
        .patch(
          "https://tennis365-api.herokuapp.com/admin/manage-order",
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
export const patchStatus = async (req, res) => {
  const newStatusInfo = req.body;
  const filteredArray = newStatusInfo.map((item) => {
    return (({ id, status }) => ({ id, status }))(item);
  });
  try {
    filteredArray.forEach(async (item) => {
      await updateStatus(item);
    });
    res.send();
  } catch (err) {
    console.log(err);
  }
};
```
