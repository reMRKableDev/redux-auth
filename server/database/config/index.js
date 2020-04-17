require("dotenv").config();

const mysql = require("mysql");
const sqlCommand = require("./sqlCommand");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection to the database
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// open the MySQL connection
connection.connect((connectError) => {
  if (connectError) throw connectError;
  console.log("Successfully connected to the database");
  connection.query(sqlCommand, (createError, result) => {
    if (createError) throw createError;
    console.log("Successfully created table");
  });
});

module.exports = connection;
