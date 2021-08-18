import "./ItemListEdit.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";
// import { useAxios } from "../../hooks/useAxios";
import axios from "axios";

const ItemListEdit = ({ itemId }) => {
  const { products } = useContext(ProductContext);
  const [targetItem, setTargetItem] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [values, setValues] = useState({});
  const [file, setFile] = useState("");
  // const{response,errorMessage} = useAxios({
  //   method:'patch',
  //   url:`/admin/item-list`,
  //   data:{values}
  // })
  const handleFile = (e) => {
    setFile(e.target.files);
    console.log(e.target.file, "dd", e.target.files);
  };

  const requestUpdate = (e) => {
    e.preventDefault();
    console.log("submit", values);
    console.log("data", file[0]);
    const formData = new FormData();
    formData.append("imgUrl", file[0]);
    formData.append("editInfo", JSON.stringify(values));
    axios.patch("http://localhost:3001/admin/item-list", formData);
  };

  useEffect(() => {
    if (itemId) {
      setTargetItem(products.find((item) => item.id === parseInt(itemId)));
      console.log(targetItem);
    }
  }, [itemId]);

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
        imgUrl: targetItem.imgUrl,
      });
    }
    setPreviewImg(`http://localhost:3001/admin/${targetItem.imgUrl}`);
  }, [targetItem]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="post-item__edit"
      onSubmit={(e) => requestUpdate(e)}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="상품명">상품명</label>
          <input
            type="text"
            name="product_name"
            id="상품명"
            value={values.product_name}
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>
          {/* <input type="text" name="헤드사이즈" id="헤드사이즈" /> */}
          <select
            name="balance"
            id="밸런스"
            onChange={(e) => inputChange(e)}
            required
          >
            <option value={values.balance}>{values.balance}</option>
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>

          <select
            name="string_pattern"
            id="스트링패턴"
            onChange={(e) => inputChange(e)}
            required
          >
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
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
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
            onChange={(e) => inputChange(e)}
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
            name="imgUrl"
            accept="image/*"
            onChange={(e) => {
              setPreviewImg(window.URL.createObjectURL(e.target.files[0]));
              handleFile(e);
            }}
          />
        </div>
        <textarea
          name="description"
          id="설명"
          cols="30"
          rows="10"
          value={values.description}
          onChange={(e) => inputChange(e)}
          required
        ></textarea>

        <button>등록</button>
      </div>
    </form>
  );
};

export default ItemListEdit;
