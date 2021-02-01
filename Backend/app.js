var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors'); //
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createConnection } = require('typeorm');
var indexRouter = require('./routes/index');
var transferRouter = require('./routes/transfer');
var app = express();

(async() => { await createConnection(); })();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); //

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
  });

app.use('/index', indexRouter);
app.use('/transfer', transferRouter);

http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;