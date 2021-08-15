import "./PostItemForm.scss";

const PostItemForm = ({ handleInputChange, handleItemSubmit, handleFiles }) => {
  // const files = (e) => {
  //   console.log(e.target.files);
  //   // console.log()
  // };

  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="post-item__form"
      onSubmit={(e) => handleItemSubmit(e)}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="상품명">상품명</label>
          <input
            type="text"
            name="product_name"
            id="상품명"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="브랜드">브랜드</label>
          <input
            type="text"
            name="brand"
            id="브랜드"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="무게">무게</label>
          <input
            type="text"
            name="weight"
            id="무게"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="헤드사이즈">헤드사이즈</label>
          {/* <input type="text" name="헤드사이즈" id="헤드사이즈" /> */}
          <select name="head_size" id="헤드사이즈" onChange={handleInputChange}>
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>
          {/* <input type="text" name="스트링패턴" id="스트링패턴" /> */}
          <select
            name="string_pattern"
            id="스트링패턴"
            onChange={handleInputChange}
          >
            <option value="16x19">16x19</option>
            <option value="16x18">16x18</option>
            <option value="18x20">18x20</option>
          </select>
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>
          <input
            type="text"
            name="balance"
            id="밸런스"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="길이">길이</label>
          <input
            type="text"
            name="length"
            id="길이"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="그립사이즈">그립사이즈</label>
          <input
            type="text"
            name="grip_size"
            id="그립사이즈"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <input
            type="text"
            name="price"
            id="가격"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="수량">수량</label>
          <input
            type="text"
            name="stock"
            id="수량"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="item__description">
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          onChange={handleInputChange}
        ></textarea>
        <input
          type="file"
          name="itemImgs"
          accept="image/*"
          onChange={handleFiles}
          multiple
        />
        <button>등록</button>
      </div>
    </form>
  );
};

export default PostItemForm;