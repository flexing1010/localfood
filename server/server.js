import express from "express";
import rootRouter from "./routers/rootRouter.js";
import mysql from "mysql";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 5000;

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
    console.log("✅DB connected");
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

app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening localhost:${PORT}🚀`);
});
