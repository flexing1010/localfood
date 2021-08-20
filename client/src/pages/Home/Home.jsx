import { useContext } from "react";
import { ProductContext } from "../../Context";
import DisplayItem from "../../components/DisplayItem/DisplayItem.jsx";
// import ProductImg from "../../components/ProductImg/ProductImg";

// import DisplayVertical from "../components/DisplayVertical";

const Home = () => {
  const { products } = useContext(ProductContext);

  return (
    <section className="home" style={{ width: "100%" }}>
      <DisplayItem items={products} />
    </section>
  );
};

export default Home;
