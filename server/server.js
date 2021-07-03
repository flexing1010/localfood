import express from "express";
import mysql from "mysql";

const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});



app.listen(PORT, () => {
  console.log(`Server is Listening localhost:${PORT}🚀`);
});
