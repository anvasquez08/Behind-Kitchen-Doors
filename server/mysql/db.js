const mysql = require("mysql");

const config = {
  host: "realdeal16.c0dk4hjayriz.us-east-1.rds.amazonaws.com",
  user: "anvasquez08",
  password: "soloweek08",
  database: "RealDeal",
  port: '3306'
};

const connection = mysql.createConnection(config); 

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

exports.connection = connection;