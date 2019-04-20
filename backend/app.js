var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet')

var routes = require('./routes/index');
var port = process.env.PORT || 8000
var app = express()
app.use(helmet())

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(favicon());
app.use(express.static((path.resolve(__dirname, '..', 'public'))))
// app.get('/', function(req, res){
//     res.sendFile(path.resolve(__dirname, '..', 'public','index.html'));
//   });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);
// app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.status(err.status || 500).send(JSON.stringify(
            {
                'message' : err.message,
                'error' : err
            }
        ));
    });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify(
        {
            'result' : 'Server Error',
            'data' : null
        }
    ));
});

app.listen(port, () => console.log(`Server side of JUConnect app listening on port ${port}!`))
module.exports = app;
