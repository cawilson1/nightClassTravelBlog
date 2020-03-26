const mysql = require("mysql");

const { host, user, password } = require("./credentials");

const con = mysql.createConnection({
  host: host,
  user: user,
  password: password
});

con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE IF NOT EXISTS travelblog;");
  con.query("USE travelblog");
  con.query(
    "CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), password varchar(55), country varchar(100), PRIMARY KEY(id));",
    function(error, result, fields) {
      console.log(result);
    }
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS blogposts(id int NOT NULL AUTO_INCREMENT, destination varchar(100), date varchar(20), posts varchar(2000), usersid int REFERENCES users(id), PRIMARY KEY(id));",
    function(error, result, fields) {
      console.log(result);
    }
  );
  con.end();
});
