import "./Order.scss";
import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import OrderForm from "../../components/OrderForm/OrderForm";
import { AuthContext } from "../../Context";
import { useAxios } from "../../hooks/useAxios.js";

const Order = () => {
  const [orderInfo, setOrderInfo] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [authorized, setAuthorized] = useState(true);
  const [user, setUser] = useState("");
  const [initValues, setInitValues] = useState();
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

  const { response } = useAxios({
    method: "get",
    url: `/order/${id}`,
  });

  useEffect(() => {
    if (response) {
      setUser(response.user);
      setOrderInfo(response.orderInfo);
      setOrderItems(response.orderItems);
      // setInitValues({
      //   name: user.name,
      //   email: "",
      //   address2: "",
      // });
    }
  }, [response]);

  useEffect(() => {
    if (user) {
      if (authState.id !== user.id) {
        setAuthorized(false);
      }
    }
  }, [user, authState.id]);

  return (
    <section className="order-page" style={{ margin: "0 auto" }}>
      {authorized ? (
        <OrderForm
          // initValues={initValues}
          orderInfo={orderInfo}
          orderItems={orderItems}
          user={user}
        />
      ) : (
        <Redirect to="/" />
      )}
    </section>
  );
};

export default Order;
