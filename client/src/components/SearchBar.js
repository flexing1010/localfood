import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  let history = useHistory();

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3001/search", {
        params: { keyword },
      })
      .then((res) => {
        if (res.data.errorMessage) {
          alert(res.data.errorMessage);
          console.log(res.data.errorMessage);
        }

        setResult(res.data);
        history.push(`/search`, { searchResult: result });
      });
  };

  return (
    <form method="GET" className="SearchBar" onSubmit={search}>
      <input type="text" name="keyword" onChange={handleKeyword} />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
