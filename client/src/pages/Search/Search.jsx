import { useLocation } from "react-router-dom";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import DisplayVertical from "../../components/DisplayVertical/DisplayVertical";

const Search = () => {
  const location = useLocation();
  const results = location.state.searchResult;
  return (
    <section className="search" style={{ margin: "0 auto" }}>
      {/* <ul className="verticalDisplay">
        {results.map((result) => {
          console.log(result);
          return <DisplayVertical product={result} />;
        })}
      </ul> */}
      <DisplayItem items={results} />
    </section>
  );
};

export default Search;
