var mysql = require('mysql');

var host = "INSERT_HOST";
var username = "INSERT_USERNAME";
var password = "INSERT_PASSWORD";
var freq = 200 //ms
var interval;

var conn;

function start() {
  conn = mysql.createConnection({
    host: host,
    user: username,
    password:password 
  });

  conn.connect(function(err) {
    if (err) throw err;
    console.log(">> Connected to MySQL");
    createDatabase();
  });
}

function createDatabase() {
  console.log(">> Creating database");
  conn.query("CREATE DATABASE IF NOT EXISTS TestInserts", function (err, result) {
    if (err) {
      console.log(">>>> Error: " + err.code);
      process.exit(1);
    } else {
      console.log(">>>> Database created or exists.");
    }

    // Use the new database
    conn.changeUser({database : 'TestInserts'}, function(err) {
      if (err) throw err;
      createTable();
    });
  });
}

function createTable() {
  console.log(">> Creating table");
  var sql = "CREATE TABLE IF NOT EXISTS data (id int NOT NULL AUTO_INCREMENT, data bigint, PRIMARY KEY (id))";
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(">>>> Error: " + err.code);
      process.exit(1);
    } else {
      console.log(">>>> Table created or exists.");
      console.log(">> Starting inserts every " + freq + " ms");
      interrval = setInterval(doInsert, freq);
    }
  });
}

function doInsert() {
  var now = (new Date).getTime();
  console.log(">>>> Insert: " + now);
  var sql = "INSERT INTO data VALUES (null, " + now + ")";
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(">>>> Error: " + err.code);
      process.exit(1);
    } 
  });
}


start();

