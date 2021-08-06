import mysql from "mysql2";

export const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
  port: "3306",
  dateStrings: true,
});

// db.connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("✅DB connected");
//   }
// });
