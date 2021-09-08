import "./Home.scss";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { ProductContext } from "../../Context";
import DisplayItem from "../../components/DisplayItem/DisplayItem.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const { products } = useContext(ProductContext);
  const isMobile = useMediaQuery({ query: "(max-width:650px)" });
  return (
    <main className="home" style={{ width: "100%" }}>
      {!isMobile ? (
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          // thumbWidth={100}
          width="100%"
          centerMode={true}
          centerSlidePercentage={100}
          showStatus={false}
          dynamicHeight={true}
        >
          <div>
            <img src="/images/carousel-wilson.jpg" alt="" />
          </div>
          <div>
            <img src="/images/carousel-babolat.jpg" alt="" />
          </div>
          <div>
            <img src="/images/carousel-head.jpg" alt="" />
          </div>
        </Carousel>
      ) : (
        <div className="home-img-container">
          <div>
            <img src="/images/carousel-wilson.jpg" alt="" />
          </div>
          <div>
            <img src="/images/carousel-babolat.jpg" alt="" />
          </div>
          <div>
            <img src="/images/carousel-head.jpg" alt="" />
          </div>
        </div>
      )}
      <DisplayItem items={products} />
    </main>
  );
};

export default Home;
