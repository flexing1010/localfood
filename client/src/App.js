import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext, ProductContext } from "./Context";
import axios from "axios";

import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
// import { useHistory } from "react-router-dom";

function App() {
  // const cancelToken = axios.CancelToken
  // const source = cancelToken.source
  const [products, setProducts] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const getAuth = axios.get("http://localhost:3001/auth", {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  });

  //  let history = useHistory();

  useEffect(() => {
    console.log("app", authState);
    axios.all([getAuth, axios.get("http://localhost:3001/")]).then((res) => {
      if (res[0].data.errorMessage) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: res[0].data.username,
          id: res[0].data.id,
          status: true,
          // cartId: res[0].data.cartId,
        });
      }

      setProducts(res[1].data);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <ProductContext.Provider value={{ products }}>
          <Router>
            <Navbar />
            <div className="body-wrapper">
              {/* 버그 authState때문에 에러가 생기는 듯 */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/details" component={ProductDetails} />
                <Route path="/search" component={Search} />
                <Route path="/cart" component={Cart} />
                <Route path="/order/:order_id" component={Order} />
                <Route path="/productdetails/:id" component={ProductDetails} />

                {!authState.status && (
                  <Switch>
                    <Route path="/join" component={Join} />
                    <Route path="/login" component={Login} />
                  </Switch>
                )}
              </Switch>
            </div>
            <Footer />
          </Router>
        </ProductContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
