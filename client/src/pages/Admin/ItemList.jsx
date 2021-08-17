import { useEffect } from "react";
import ItemListDisplay from "../../components/Admin/ItemListDisplay";

import { useAxios } from "../../hooks/useAxios";

import "./ItemList.scss";
const ItemList = () => {
  // const [all]
  // const { response, errorMessage } = useAxios({
  //   method: "get",
  //   url: `/admin/item-list`,
  // });
  useEffect(() => {
    // console.log(products);
  });
  return (
    <section className="item-list">
      <ItemListDisplay />
    </section>
  );
};

export default ItemList;
