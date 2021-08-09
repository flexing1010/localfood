import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001";
const useAxios = ({ url, method, body = null, params = null }) => {
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.parse(body), JSON.parse(params))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
    // .finally(()=>{
    //     setLoading(false);
    // })
  };
  useEffect(() => {
    fetchData();
  }, [method, url, body, params]);

  return { response, errorMessage };
};

export default useAxios;
