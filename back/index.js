const app = require('express')();
const http = require('http');
const socketIO = require('socket.io');
const telebot = require('./bot');
const models = require('./models');

const server = http.Server(app);
server.listen(3000, function () {
    console.log('Server back listen on 3000!')
});

const socket = socketIO.listen(server);

//set websocket to send messages
const websocket = require('./websocket')(socket);

telebot.init(websocket);

app.get('/getInitialState', (req, res) => {
    models.getInitialState(req, res)
});

app.all(function (req, res, next) {
    console.log(req);
})
