
app.get("/users", (req, res) => {

  const fetchUsers = async () => {
    const response = await fetch("https://randomuser.me/api/?nat=us");
    const body = await response.json();
    // if (response.status !== 200) {
    //   throw Error(body.message);
    // }
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
    // sql.connect();
    sql.query(`INSERT INTO users (fname, lname, email, phone, street, city, state, dob, hireDate) VALUES ('${userObj.fname}', '${userObj.lname}', '${userObj.email}', '${userObj.phone}', '${userObj.street}', '${userObj.city}', '${userObj.state}', '${userObj.dob}', '${userObj.hireDate}')`);
    // sql.end();
    // res.json(userObj);
    res.end();
  };
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      fetchUsers();
    }, 3000);
    
  }

});