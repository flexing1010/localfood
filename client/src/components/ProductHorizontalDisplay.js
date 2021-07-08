import "./ProductHorizontalDisplay.scss";

const ProductHorizontalDisplay = () => {
  return (
    <div className="horizontalDisplay">
      <div className="cart__img">
        <img src="/images/3.jpg" alt="cart-img" />
      </div>
      <div className="cart__info">
        <h3>곱분이 곱창</h3>
        <span>불막창</span>
      </div>
    </div>
  );
};

export default ProductHorizontalDisplay;
