## 관리자 상품 CRUD

### 상품등록

![365-add_product](https://user-images.githubusercontent.com/79352105/136040800-cda56fee-a563-427a-94a1-44bd18eb4389.gif)

```
client-side

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const itemInfo = {
      product_name: values.product_name,
      brand: values.brand,
      weight: values.weight,
      head_size: values.head_size,
      string_pattern: values.string_pattern,
      balance: values.balance,
      length: values.length,
      grip_size: values.grip_size,
      price: values.price,
      stock: values.stock,
      description: values.description,
    };

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("itemImgs", files[i]);
    }
    formData.append("coverImg", coverImg);
    formData.append("itemInfo", JSON.stringify(itemInfo));
    axios
      .post(
        "https://tennis365-api.herokuapp.com/admin/post-item",
        formData
      )
      .then((res) => {
        setProducts(res.data);
        alert("등록이 완료되었습니다");
      });
    e.target.reset();
    setFiles("");
  };
```

- 이미지 파일들을 포함한 상품정보를 서버 API로 post 요청한다.

<br />

```
server-side

export const postItem = async (req, res) => {
  const itemInfo = JSON.parse(req.body.itemInfo);
  const imgFiles = req.files.itemImgs;
  const coverImg = req.files.coverImg;

  try {
    if (itemInfo) {
      const insertedItem = await insertItem(itemInfo, coverImg[0]);
      await insertCategory(parseInt(itemInfo.brand), insertedItem.insertId);
      await imgFiles.forEach((img) => {
        insertItemImgs(img, insertedItem);
      });
      const allItems = await getAllProducts();
      res.json(allItems);
    }
  } catch (err) {
    console.log(err);
  }
};
```

- 프론트엔드로부터 받은 이미지 파일정보를 multer 미들웨어를 통해 처리하고 나머지 정보들과 함께 DB에 저장한다.

<br />

### 상품수정

![365-edit_product](https://user-images.githubusercontent.com/79352105/136041405-c3f206ff-1481-4f10-bb27-1b3ed1c2737e.gif)

```
client-side

  const requestUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < itemImgs.length; i++) {
      formData.append("editedImgs", itemImgs[i]);
    }
    formData.append("imgUrl", coverImg[0]);
    formData.append("editInfo", JSON.stringify(values));
    formData.append("itemId", itemId);
    axios
      .patch("https://tennis365-api.herokuapp.com/admin/item-list", formData)
      .then((res) => {
        setProducts(res.data.allItems);
        alert(res.data.success);
      });
  };
```

<br />

```
export const updateItem = async (req, res) => {
  const editImg = req.files.imgUrl;
  const editImgs = req.files.editedImgs;
  const editInfo = JSON.parse(req.body.editInfo);
  const itemId = req.body.itemId;

  try {
    if (editImg && editImgs) {
      await updateItemInfo(itemId, editInfo, editImg[0]);
      await deleteItemImgs(itemId);
      await editImgs.forEach((img) => {
        editItemImgs(img, itemId);
      });
    } else if (editImg) {
      await updateItemInfo(itemId, editInfo, editImg[0]);
    } else if (editImgs) {
      await deleteItemImgs(itemId);
      await editImgs.forEach((img) => {
        editItemImgs(img, itemId);
      });
    }
    await updateItemInfo(itemId, editInfo, undefined);

    const allItems = await getAllProducts();
    res.send({ allItems, success: "수정되었습니다" });
  } catch (err) {
    console.log(err);
  }
};
```

- 프론트엔드로 부터 어떤 데이터(커버이미지,상세이미지(들),상품정보)가왔는지를 확인하고 그에 맞는 코드를 실행한다.

### 상품삭제

```
client-side

  const handleDelete = (e) => {
    if (window.confirm("상품을 삭제하시겠습니까?")) {
      axios
        .delete(url, {
          data: {
            targetId,
          },
        })
        .then((res) => {
          filterItemList(targetId);
          alert(res.data.success);
        });
      if (closeModal) {
        closeModal();
      }
    }
  };
```

- 삭제기능을 컴포넌트화 해서 사용
- 삭제버튼을 누르면 삭제여부를 확인묻고 props로 보내진 url에 해당 상품의 targetId를 보낸다

<br />

```
server-side

export const deleteAdminItem = async (req, res) => {
  const { targetId } = req.body;
  try {
    await deleteItem(targetId);
    console.log("item deleted");
    res.send({ success: "삭제되었습니다" });
  } catch (err) {
    console.log(err);
  }
};
```
