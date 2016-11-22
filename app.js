const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const querystring = require('querystring');
const request = require('request');

var app = express();

const login = require('./routes/login');

var http = require('http').Server(app);

const server = http.listen(3000, function () {
    console.log('Listening on port 3000!');
});

mySocket = require('socket.io').listen(server);
// usar

var webIO = require('./routes/webIO');

// require('./controller/websocket')(http);

const controller = require('./controller/controller');

(function receiveFromSocket () {
    mySocket.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('chat message', function (data) {
            controller.handleFromGui(data);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
})();


// var websocket = io.init(http);
// console.log('websocket', websocket);




const telebot = require('./routes/telebot');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon-32x32.png')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

//static paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/socket.io-client/')));

app.all(telebot); //qual metodo chega? não precisa passar todos por aqui

app.use('/', login);






// ----------------------------------
// errors and server
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




module.exports = app;