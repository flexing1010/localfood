import "./Home.scss";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../Context";
// import DisplayVertical from "../components/DisplayVertical";

const Home = () => {
  let history = useHistory();
  const { products } = useContext(ProductContext);

  return (
    <section className="home">
      <ul className="homeDisplay">
        {products.map((product) => {
          // return <DisplayVertical product={product} key={product.id} />;
          return (
            <li
              className="menu"
              onClick={() => {
                history.push(`/productdetails/${product.id}`);
              }}
              key={product.product_id}
            >
              <div className="menu__img">
                <img src={product.imgUrl} alt="menu-imgs" />
              </div>
              <div className="menu__description">
                <h2>{product.product_name}</h2>
                <small>{product.restaurant}</small>
                <small>{product.rating}</small>
                <span>{product.price}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
