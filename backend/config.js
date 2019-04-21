var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'adminjuconnect',
    password: 'password',
    database: 'juconnect'
});

try {
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}
module.exports = connection