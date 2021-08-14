import "./PostItemForm.scss";

const PostItemForm = () => {
  return (
    <form
      action=""
      className="post-item__form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="상품명">상품명</label>
          <input type="text" name="상품명" id="상품명" />
        </div>
        <div>
          <label htmlFor="브랜드">브랜드</label>
          <input type="text" name="브랜드" id="브랜드" />
        </div>
        <div>
          <label htmlFor="무게">무게</label>
          <input type="text" name="무게" id="무게" />
        </div>
        <div>
          <label htmlFor="헤드사이즈">헤드사이즈</label>
          {/* <input type="text" name="헤드사이즈" id="헤드사이즈" /> */}
          <select name="헤드사이즈" id="헤드사이즈">
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>
          {/* <input type="text" name="스트링패턴" id="스트링패턴" /> */}
          <select name="스트링패턴" id="스트링패턴">
            <option value="16x19">16x19</option>
            <option value="16x18">16x18</option>
            <option value="18x20">18x20</option>
          </select>
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>
          <input type="text" name="밸런스" id="밸런스" />
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>
          <input type="text" name="스트링패턴" id="스트링패턴" />
        </div>
        <div>
          <label htmlFor="길이">길이</label>
          <input type="text" name="길이" id="길이" />
        </div>
        <div>
          <label htmlFor="그립사이즈">그립사이즈</label>
          <input type="text" name="그립사이즈" id="그립사이즈" />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <input type="text" name="가격" id="가격" />
        </div>
        <div>
          <label htmlFor="수량">수량</label>
          <input type="text" name="수량" id="수량" />
        </div>
      </div>
      <div className="item__description">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <input type="file" />
        <button>등록</button>
      </div>
    </form>
  );
};

export default PostItemForm;
