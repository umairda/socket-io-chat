var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var logger = require('morgan');
var path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.locals.pretty = true;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

var config = require('./config/config');
process.title = config.process.title;

//Connect to mongoDB
require('./models/connect');

var routes = require('./routes/routes');
routes(app);

var errorHandlers = require('./errorHandlers');
errorHandlers(app);

var serverHelpers = require('./config/serverHelpers')();
var normalizePort = serverHelpers.normalizePort;

//var port = config.applicationPort;
var port = normalizePort(process.env.PORT || config.applicationPort);
app.set('port',port);

var server = http.createServer(app);
var serverEvents = require('./config/serverEvents')(server);
var onError = serverEvents.onError;
var onListening = serverEvents.onListening;
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);

var io = require('socket.io').listen(server);
var socketHandler = require('./controllers/socket.controller.js');
socketHandler(io);

process.env.NODE_ENV = app.get('env');
