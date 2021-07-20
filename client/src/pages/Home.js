import "./Home.scss";
// import axios from "axios";
// import {  useEffect} from "react";
import VerticalDisplay from "../components/VerticalDisplay";

const Home = () => {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/").then((res) => {
  //     setProductList(res.data);
  //   });
  //   // eslint-disable-next-line
  // }, []);

  return (
    <section className="home">
      <VerticalDisplay />
    </section>
  );
};

export default Home;
