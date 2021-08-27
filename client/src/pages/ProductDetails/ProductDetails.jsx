import "./ProductDetails.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context";
import { useAxios } from "../../hooks/useAxios.js";
import DisplayProductDetails from "./DisplayProductDetails";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [productImgs, setProductImgs] = useState([]);
  const { authState } = useContext(AuthContext);

  let { id } = useParams();

  const addCart = () => {
    console.log(authState);
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

  const { response } = useAxios({
    method: "get",
    url: `/view/${id}`,
  });

  useEffect(() => {
    if (response) {
      console.log(response);
      setProduct(response.product[0]);
      setProductImgs(response.productImgs);
    }
  }, [product, response]);

  ////// 왼쪽 사진 오른쪽 기본 정보 밑에 상세 정보 & 리뷰
  return (
    <section className="product-container">
      <DisplayProductDetails
        product={product}
        addCart={addCart}
        productImgs={productImgs}
      />
      <Reviews />
    </section>
  );
};

export default ProductDetails;
