var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createConnection } = require('typeorm');
var indexRouter = require('./routes/index');
var app = express();

(async() => { await createConnection(); })();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.get('/hey', (req, res) => res.json({username : "Express"}))

http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
module.exports = app;