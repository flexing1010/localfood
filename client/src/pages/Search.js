import { useLocation } from "react-router-dom";
const Search = () => {
  const location = useLocation();
  const result = location.state.searchResult;
  return (
    // <div onClick={() => console.log(location.state.searchResult)}>asd</div>
    <div>{result[0].product_name}</div>
  );
};

export default Search;
