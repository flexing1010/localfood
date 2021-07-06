import "./App.scss";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Footer from "./components/Footer.js";

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
        {/* <form action="">
          <label>Name</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Age</label>
          <input
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <button onClick={addUser}>Submit</button>
        </form> */}
        <Navbar />
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
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
