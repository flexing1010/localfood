// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useAxios } from "../../hooks/useAxios.js";

const Order = () => {
  const [orderInfo, setOrderInfo] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState([]);

  let { id } = useParams();

  const { response, errorMessage } = useAxios({
    method: "get",
    url: `/order/${id}`,
  });

  // useEffect(() => {
  //   axios.get(`http://localhost:3001/order/${id}`).then((res) => {
  //     const { orderInfo, orderItems, user } = res.data;
  //     if (res.status === 200) {
  //       setOrderInfo(orderInfo);
  //       setOrderItems(orderItems);
  //       setUser(user);
  //     }
  //     console.log(orderInfo, user, orderItems);
  //   });
  // }, [orderInfo]);

  useEffect(() => {
    if (response) {
      setOrderInfo(response.orderInfo);
      setOrderItems(response.orderItems);
      setUser(response.user);
      console.log(orderInfo, orderItems, user);
    }
  }, [orderItems, orderInfo, response]);

  return (
    <section>
      <OrderForm orderInfo={orderInfo} orderItems={orderItems} user={user} />
    </section>
  );
};

export default Order;
