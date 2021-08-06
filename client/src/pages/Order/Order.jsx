import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderForm from "../../components/OrderForm/OrderForm";

const Order = () => {
  const [orderInfo, setOrderInfo] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState([]);
  // const { authState } = useContext(AuthContext);
  // const location = useLocation();
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/order/${id}`).then((res) => {
      const { orderInfo, orderItems, user } = res.data;
      if (res.status === 200) {
        setOrderInfo(orderInfo);
        setOrderItems(orderItems);
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    console.log(orderInfo, orderItems, user);
  }, [orderItems, orderInfo]);

  return (
    <section>
      <OrderForm orderInfo={orderInfo} orderItems={orderItems} user={user} />
    </section>
  );
};

export default Order;
