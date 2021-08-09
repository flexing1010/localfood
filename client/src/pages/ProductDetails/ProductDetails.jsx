import "./ProductDetails.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../Context";
import useAxios from "../../hooks/useAxios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { authState } = useContext(AuthContext);

  let { id } = useParams();

  const addCart = () => {
    if (authState) {
      axios
        .post("http://localhost:3001/cart", {
          user_id: authState.id,
          product_id: product.id,
          quantity: 1,
        })
        .then((res) => {
          if (res.data.errorMessage) {
            return alert(res.data.errorMessage);
          }
          alert(res.data);
        });
    }
  };

  const { response, errorMessage } = useAxios({
    method: "get",
    url: `/view/${id}`,
  });

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3001/view/${id}`)
    //   .then((res) => setProduct(res.data[0]));
    if (response) setProduct(response[0]);
  }, [product, response]);

  ////// 왼쪽 사진 오른쪽 기본 정보 밑에 상세 정보 & 리뷰
  return (
    <section className="product-container">
      <div className="product__display">
        {
          <>
            <div className="detail__img">
              <img src={product.imgUrl} alt="" />
              <h2>{product.product_name}</h2>
            </div>
            <div className="detail__info">
              <h3>판매가 {product.price}원</h3>

              <table className="spec" cellspacing="0">
                <tbody>
                  <tr>
                    <th>상품명</th>
                    <td>{product.product_name}</td>
                  </tr>
                  <tr>
                    <th>무게</th>
                    <td>{product.weight}</td>
                  </tr>
                  <tr>
                    <th>헤드사이즈</th>
                    <td>{product.head_size}</td>
                  </tr>
                  <tr>
                    <th>스트링패턴</th>
                    <td>{product.string_pattern}</td>
                  </tr>
                  <tr>
                    <th>밸런스</th>
                    <td>{product.balance}</td>
                  </tr>
                  <tr>
                    <th>길이</th>
                    <td>{product.length}</td>
                  </tr>
                  <tr>
                    <th>그립사이즈</th>
                    <td>{product.grip_size}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button handleBtnClick={addCart} text={"장바구니 담기"} />
          </>
        }
      </div>

      <div className="product__reviews"></div>
    </section>
  );
};

export default ProductDetails;
