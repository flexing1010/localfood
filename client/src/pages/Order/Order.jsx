import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context";

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);

  const { authState } = useContext(AuthContext);
  const location = useLocation();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/order/${id}`, {
  //       params: {
  //         username: authState.username,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("d", res.data.orderId);
  //     });
  // }, [authState]);

  useEffect(() => {
    if (orderItems.length !== 0) {
      setOrderItems(location.state.orderItems);
    }
  }, [orderItems]);

  return <div>order</div>;
};

export default Order;
