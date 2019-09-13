//Dependencies
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const app = express();
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "users"
});
sql.connect();
dotenv.config();

//GET
app.get("/users", (req, res) => {
  sql.query("SELECT * FROM USERS", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

const port = process.env.PORT || 25565;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

});

