import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  port: "3306",
  // multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("✅DB connected");
  }
});
