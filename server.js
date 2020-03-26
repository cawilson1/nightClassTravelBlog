const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const app = express();
const mysql = require("mysql2/promise");
const { host, user, password } = require("./credentials");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createPool({
  host: host,
  user: user,
  password: password
});

/*app.post("/users", (req, res) => {
  if (
    req.query.username &&
    req.query.email &&
    req.query.password &&
    req.query.country
  ) {
    console.log("Request received");
    con.connect(function(err) {
      con.query(
        `INSERT INTO travelblog.users (username, email, password, country) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.password}', '${req.query.country}')`,
        function(err, result, fields) {
          if (err) res.send(err);
          if (result)
            res.send({
              username: req.query.username,
              email: req.query.email,
              password: req.query.password,
              country: req.query.country
            });
          if (fields) console.log(fields);
        }
      );
    });
  } else {
    console.log("Missing a parameter");
  }
});*/
app.post("/users", async (req, res) => {
  try {
    const result = await con.query(
      `INSERT INTO travelblog.users (username, email, password, country) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.password}', '${req.query.country}')`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await con.query(`SELECT * FROM travelblog.users`);
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
