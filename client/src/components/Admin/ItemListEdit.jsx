import "./ItemListEdit.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";

const ItemListEdit = ({ itemId }) => {
  const { products } = useContext(ProductContext);
  const [targetItem, setTargetItem] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const [values, setValues] = useState({});

  useEffect(() => {
    if (itemId) {
      setTargetItem(products.find((item) => item.id === parseInt(itemId)));
    }
  }, [itemId]);

  const change = (e) => {
    setValues({ product_name: e.target.value });
  };

  useEffect(() => {
    if (targetItem) {
      setValues({
        product_name: targetItem.product_name,
        brand: targetItem.brand,
        weight: targetItem.weight,
        head_size: targetItem.head_size,
        string_pattern: targetItem.string_pattern,
        balance: targetItem.balance,
        length: targetItem.length,
        grip_size: targetItem.grip_size,
        price: targetItem.price,
        stock: targetItem.stock,
        description: targetItem.description,
        itemImg: targetItem.itemImg,
      });
    }
    setPreviewImg(`http://localhost:3001/admin/${targetItem.imgUrl}`);
  }, [targetItem]);

  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="post-item__edit"
      //   onSubmit={(e) => handleItemSubmit(e)}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="상품명">상품명</label>
          <input
            type="text"
            name="product_name"
            id="상품명"
            value={values.product_name}
            onChange={(e) => change(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="브랜드">브랜드</label>
          <input
            type="text"
            name="brand"
            id="브랜드"
            value={values.brand}
            required
          />
        </div>
        <div>
          <label htmlFor="무게">무게</label>
          <input
            type="number"
            min="200"
            max="400"
            name="weight"
            id="무게"
            value={values.weight}
            required
          />
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>
          {/* <input type="text" name="헤드사이즈" id="헤드사이즈" /> */}
          <select name="balance" id="밸런스" required>
            <option value={values.balance}>{values.balance}</option>
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>
          {/* <input type="text" name="스트링패턴" id="스트링패턴" /> */}
          <select name="string_pattern" id="스트링패턴" required>
            <option value={values.string_pattern}>
              {values.string_pattern}
            </option>
            <option value="16x19">16x19</option>
            <option value="16x18">16x18</option>
            <option value="18x20">18x20</option>
          </select>
        </div>
        <div>
          <label htmlFor="헤드사이즈">헤드사이즈</label>
          <input
            type="number"
            min="90"
            max="120"
            name="head_size"
            id="헤드사이즈"
            value={values.head_size}
            required
          />
        </div>
        <div>
          <label htmlFor="길이">길이</label>
          <input
            type="number"
            min="18"
            max="30"
            name="length"
            id="길이"
            value={values.length}
            required
          />
        </div>
        <div>
          <label htmlFor="그립사이즈">그립사이즈</label>
          <input
            type="text"
            name="grip_size"
            id="그립사이즈"
            value={values.grip_size}
            required
          />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <input
            type="number"
            name="price"
            id="가격"
            value={values.price}
            required
          />
        </div>
        <div>
          <label htmlFor="수량">수량</label>
          <input
            type="number"
            name="stock"
            id="수량"
            value={values.stock}
            required
          />
        </div>
      </div>
      <div className="item__description">
        <div className="edit-img">
          <div className="img-preview">
            <img src={previewImg} alt="" />
          </div>
          <input
            type="file"
            name="itemImgs"
            accept="image/*"
            onChange={(e) => {
              setPreviewImg(window.URL.createObjectURL(e.target.files[0]));
            }}
            multiple
            required
          />
        </div>
        <textarea
          name="description"
          id="설명"
          cols="30"
          rows="10"
          value={values.description}
          required
        ></textarea>

        <button>등록</button>
      </div>
    </form>
  );
};

export default ItemListEdit;
