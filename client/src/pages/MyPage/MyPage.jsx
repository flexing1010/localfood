import "./MyPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayMyPage from "../../components/DisplayMyPage/DisplayMyPage";
import { useAxios } from "../../hooks/useAxios.js";

const MyPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState({});
  let { id } = useParams();
  const { response, errorMessage } = useAxios({
    method: "get",
    url: `/user/${id}`,
  });
  useEffect(() => {
    if (response) {
      setOrders(response.orders);
      setOrderItems(response.orderItems);
      setUser(response.user);
      console.log(orders);
    }
  }, [response]);

  return (
    <section id="mypage">
      <DisplayMyPage orders={orders} orderItems={orderItems} user={user} />
      {/* <div>{orders[0].id}</div> */}
    </section>
  );
};

export default MyPage;
