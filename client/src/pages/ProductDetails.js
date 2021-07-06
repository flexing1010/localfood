import Button from "../components/OrderButton";

const ProductDetails = () => {
  return (
    <div className="product-container">
      <div className="product__img">
        <img src="/images/3.jpg" alt="food-img" />
      </div>
      <div className="product__info">
        <h2>불막창</h2>
        <div className="product__description">
          <h3>곱분이 곱창</h3>
          <small>참숯으로 구운 직화 불막창</small>
        </div>
        <div className="product__reservation">
          <span>20,000원</span>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
