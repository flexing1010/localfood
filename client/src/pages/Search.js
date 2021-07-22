import { useLocation } from "react-router-dom";
import DisplayVertical from "../components/DisplayVertical";

const Search = () => {
  const location = useLocation();
  const results = location.state.searchResult;
  return (
    <section className="search">
      <ul className="verticalDisplay">
        {results.map((result) => {
          console.log(result);
          return <DisplayVertical product={result} />;
        })}
      </ul>
    </section>
  );
};

export default Search;
