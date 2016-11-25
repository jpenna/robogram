const express = require('express');
const path = require('path');
const app = express();

const login = require('./routes/login');

var webIO = require('./routes/webIO');
const controller = require('./controller/controller');
const telebot = require('./routes/telebot');
app.all(telebot); //qual metodo chega? não precisa passar todos por aqui




app.get('/', login);
app.post('/chatroom', login)



var http = require('http').Server(app);

const server = http.listen(3000, function () {
    console.log('Listening on port 3000!');
});


mySocket = require('socket.io').listen(server);


// require('./controller/websocket')(http);



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