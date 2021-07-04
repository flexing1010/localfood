import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("DB connected");
  }
});

app.post("/create", (req, res) => {
  // const { body: name, age } = req;
  const name = req.body.name;
  const age = req.body.age;

  db.query(
    "INSERT INTO user (name, age) VALUES (?,?)",
    [name, age],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is Listening localhost:${PORT}🚀`);
});
