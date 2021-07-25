import "./Home.scss";
// import axios from "axios";
// import {  useEffect} from "react";
import { useContext } from "react";
import { ProductContext } from "../Context";
import DisplayVertical from "../components/DisplayVertical";

const Home = () => {
  const { products } = useContext(ProductContext);
  // useEffect(() => {
  //   axios.get("http://localhost:3001/").then((res) => {
  //     setProductList(res.data);
  //   });
  //   // eslint-disable-next-line
  // }, []);

  return (
    <section className="home">
      <ul className="homeDisplay">
        {products.map((product) => {
          return <DisplayVertical product={product} key={product.id} />;
        })}
      </ul>
    </section>
  );
};

export default Home;
