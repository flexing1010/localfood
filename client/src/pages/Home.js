import axios from "axios";
import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      setProductList(res.data);
    });
    console.log("after", productList);

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* <MenuList products={productList} /> */}
      <div>
        {productList.map((value, key) => {
          return (
            <div className="product">
              <h2>{value.product_title}</h2>
              <div>{value.restaurant}</div>
              <div>{value.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
