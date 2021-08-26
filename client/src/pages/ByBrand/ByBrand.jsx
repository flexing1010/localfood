import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import { useAxios } from "../../hooks/useAxios";

const ByBrand = () => {
  const [itemByBrand, setItemByBrand] = useState([]);
  let { id } = useParams();
  const { response } = useAxios({
    method: "get",
    url: `/by-brand/${id}`,
  });

  useEffect(() => {
    if (response) {
      console.log(response);
      setItemByBrand(itemByBrand);
    }
  }, [response]);
  return (
    <section>
      <div>displayItem{id}</div>
      <DisplayItem items={itemByBrand} />
    </section>
  );
};

export default ByBrand;
