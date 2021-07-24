import "./ProductDetails.scss";
import Button from "../components/OrderButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState({});

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/view/${id}`)
      .then((res) => setProduct(res.data[0]));
  });

  return (
    <section className="product-container">
      <div className="product__display">
        {
          <>
            <div className="detail__img">
              <img src={product.imgUrl} alt="" />
            </div>
            <div className="detail__info">
              <h2>{product.product_name}</h2>
              <span>{product.restaurant}</span>
              <span>{product.description}</span>
              <span>{product.rating}</span>
              <span>{product.price}</span>
            </div>
            <Button productId={product.id} />
          </>
        }
      </div>
      <div className="product__reviews"></div>
    </section>
  );
};

export default ProductDetails;
