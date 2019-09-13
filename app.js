const express = require("express");
const mysql = require("mysql");
const fetch = require('node-fetch')
const dotenv = require("dotenv").config();
const app = express();
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "users"
});
app.get("/users", (req, res) => {
  const fetchUsers = async() => {
    const response = await fetch("https://randomuser.me/api/?nat=us");
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message);
      }
      res.json(body.results);
  };
  fetchUsers();
});
//Math.floor(Math.random() * 100000)

// app.get("/users", (req, res) => {
//   sql.connect();
//   sql.query(`SELECT * FROM USERS WHERE fname='${req.query.fname}'`, (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows);
//     sql.end();
//     return;
//   });
// });

const port = process.env.PORT || 25565; 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

});

