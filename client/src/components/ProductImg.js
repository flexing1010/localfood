const ProductImg = (props) => {
  return (
    <div className={props.class}>
      <img src={props.item.imgUrl} alt={props.item.product_name} />
    </div>
  );
};

export default ProductImg;
