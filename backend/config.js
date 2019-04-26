var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPass,
    database: 'juconnect'
});

try {
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}
module.exports = connection