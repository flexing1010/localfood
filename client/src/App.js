import "./App.scss";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// import { useState } from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Footer from "./components/Footer.js";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Cart from "./pages/Cart";

function App() {
  // const [name, setName] = useState("");
  // const [age, setAge] = useState(0);

  // const addUser = (e) => {
  //   e.preventDefault();
  //   //remember to send req to backend server!!
  //   axios.post("http://localhost:3001/create", { name, age }).then(() => {
  //     console.log("success");
  //   });
  // };

  return (
    <Router>
      <div className="App">
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
            <Route path="/join">
              <Join />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
