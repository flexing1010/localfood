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
import { AuthContext } from "./AuthContext";
// import { useHistory } from "react-router-dom";

function App() {
  const [authState, setAuthState] = useState(false);

  //  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.errorMessage) {
          setAuthState(false);
        } else {
          console.log(res);
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <div className="body-wrapper">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/details">
                <ProductDetails />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              {!authState && (
                <>
                  <Route path="/join">
                    <Join />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                </>
              )}
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
