import mysql from "mysql2";

// export const db = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "test_db",
//   port: "3306",
//   dateStrings: true,
// });
export const db = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-04.cleardb.com",
  user: "b969ac16770254",
  password: "5c3c14e8",
  database: "heroku_00c18c8deb3899e",
  dateStrings: true,
});

//b969ac16770254:5c3c14e8@us-cdbr-east-04.cleardb.com/heroku_00c18c8deb3899e?reconnect=true

// db.connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("✅DB connected");
//   }
// });
