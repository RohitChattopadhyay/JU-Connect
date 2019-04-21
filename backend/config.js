var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.mysqlHost || 'localhost',
    user: process.env.mysqlUser || 'root',
    password: process.env.mysqlPass || 'password',
    database: 'juconnect'
});

try {
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}
module.exports = connection