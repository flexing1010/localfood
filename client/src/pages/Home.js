import "./Home.scss";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../Context";
import ProductImg from "../components/ProductImg";
// import DisplayVertical from "../components/DisplayVertical";

const Home = () => {
  let history = useHistory();
  const { products } = useContext(ProductContext);

  return (
    <section className="home">
      <ul className="homeDisplay">
        {products.map((product) => {
          return (
            <li
              className="menu"
              onClick={() => {
                history.push(`/productdetails/${product.id}`);
              }}
              key={product.id}
            >
              <ProductImg item={product} class={"menu__img"} />
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
