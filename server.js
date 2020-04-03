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

app.post("/users", async (req, res) => {
  console.log("POST USERS")
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

app.get("/user", async (req, res) => {
  try {
    const result = await con.query(`SELECT * FROM travelblog.users WHERE username='${req.query.username}'`);
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.put("/users", async (req, res) => {
  try {
    const result = await con.query(
      `UPDATE travelblog.users SET username = '${req.query.username}' WHERE id = '${req.query.id}'`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.delete("/users", async (req, res) => {
  console.log("DELETE USER")
  try {
    const result = await con.query(
      `DELETE FROM travelblog.users WHERE username = '${req.query.username}'`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.post("/blogposts", async (req, res) => {
  console.log(`INSERT INTO travelblog.blogposts (destination, date, posts, usersid) VALUES ('${req.query.destination}', '${req.query.date}', '${req.query.posts}') FROM users JOIN blogposts ON (id = ${req.query.usersid})`)

  try {
    const result = await con.query(
      `INSERT INTO travelblog.blogposts (destination, date, posts, usersid) VALUES ('${req.query.destination}', '${req.query.date}', '${req.query.posts}', (SELECT id FROM travelblog.users WHERE username='${req.query.username}'))`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.get("/blogposts", async (req, res) => {
  try {
    const result = await con.query(`SELECT * FROM travelblog.blogposts`);
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.get("/userposts", async (req, res) => {
  try {
    const result = await con.query(`SELECT * FROM travelblog.blogposts where usersid=${req.query.usersid}`);
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.put("/blogposts", async (req, res) => {
  try {
    const result = await con.query(
      `UPDATE travelblog.blogposts SET destination = '${req.query.destination}' WHERE id = '${req.query.id}'`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.delete("/blogposts", async (req, res) => {
  try {
    const result = await con.query(
      `DELETE FROM travelblog.blogposts WHERE id = '${req.query.id}'`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
