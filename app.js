//Dependencies
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const app = express();
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "users"
});
sql.connect();

//GET
app.get("/users", (req, res) => {
  if (req.query.id) {
    sql.query(`SELECT * FROM USERS WHERE employeeID=${req.query.id}`, (err, rows) => {
      if (err) throw err;
      if (rows.length !== 0) {
        res.send(rows);
      } else {
        res.status(404);
        res.send(`Employee ${req.query.id} not found`);
      }
    });
  } else {
    sql.query("SELECT * FROM USERS", (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  }
});

const port = process.env.PORT || 25565;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

});

