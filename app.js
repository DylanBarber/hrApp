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
      const userObj = {
        fname: body.results[0].name.first,
        lname: body.results[0].name.last,
        email: body.results[0].email,
        phone: body.results[0].phone,
        street: body.results[0].location.street,
        city: body.results[0].location.city,
        state: body.results[0].location.state,
        dob: body.results[0].dob.date,
        hireDate: body.results[0].registered.date


      };
      sql.connect();
      sql.query(`INSERT INTO users (fname, lname, email, phone, street, city, state, dob, hireDate) VALUES ('${userObj.fname}', '${userObj.lname}', '${userObj.email}', '${userObj.phone}', '${userObj.street}', '${userObj.city}', '${userObj.state}', '${userObj.dob}', '${userObj.hireDate}')`);
      sql.end();
      res.json(userObj);
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

