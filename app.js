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

//POST
app.post("/users", (req, res) => {
  if (!req.query.fname || !req.query.lname || !req.query.email || !req.query.phone || !req.query.street || !req.query.city || !req.query.state || !req.query.dob || !req.query.hireDate){
    res.send("You are missing a field. All fields are required in query (fname, lname, email, phone, street, city, state, dob, hireDate");
  } else {
    const userObj = {
      fname: req.query.fname,
      lname: req.query.lname,
      email: req.query.email,
      phone: req.query.phone,
      street: req.query.street,
      city: req.query.city,
      state: req.query.state,
      dob: req.query.dob,
      hireDate: req.query.hireDate,
    };
    sql.query(`INSERT INTO users (fname, lname, email, phone, street, city, state, dob, hireDate) 
      VALUES ('${userObj.fname}', 
              '${userObj.lname}', 
              '${userObj.email}', 
              '${userObj.phone}', 
              '${userObj.street}', 
              '${userObj.city}', 
              '${userObj.state}', 
              '${userObj.dob}', 
              '${userObj.hireDate}')`);
    res.send(`The following user was added to the database ${JSON.stringify(userObj)}`);
  }
});

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

