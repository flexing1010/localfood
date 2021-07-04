import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const addUser = (e) => {
    e.preventDefault();
    //remember to send req to backend server!!
    axios.post("http://localhost:3001/create", { name, age }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="App">
      <form action="">
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
      </form>
    </div>
  );
}

export default App;
