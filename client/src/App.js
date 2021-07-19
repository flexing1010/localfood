import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Footer from "./components/Footer.js";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Cart from "./pages/Cart";
import { AuthContext, ProductContext } from "./Context";
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

  //  let history = useHistory();

  useEffect(() => {
    axios
      .all(
        [
          axios.get("http://localhost:3001/auth"),
          axios.get("http://localhost:3001/"),
        ],
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res[0].data.errorMessage) {
          setAuthState({ ...authState, status: false });
        } else {
          console.log(res);
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
        setProducts(res[1].data);
      });
    console.log(products);
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
