import "./MyPage.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import DisplayMyPage from "../../components/DisplayMyPage/DisplayMyPage";
import { useAxios } from "../../hooks/useAxios.js";
import { AuthContext } from "../../Context";

const MyPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState({});
  const [authorized, setAuthorized] = useState(true);
  const { authState } = useContext(AuthContext);
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
      if (parseInt(id) !== authState.id) {
        setAuthorized(false);
      }
    }
  }, [response, authState.id, id]);

  return (
    <section id="mypage">
      {authorized ? (
        <DisplayMyPage orders={orders} orderItems={orderItems} user={user} />
      ) : (
        <Redirect to="/" />
      )}
      {/* <div>{orders[0].id}</div> */}
    </section>
  );
};

export default MyPage;
