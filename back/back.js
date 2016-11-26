const express = require('express');
const path = require('path');
const errorRoutes = require('./errors');
const http = require('http');
const socketIo = require('socket.io');
const socketInput = require('./server/socket/input');
const socketOutput = require('./server/socket/output');
const back = express();

const telebot = require('./bot/telebot');
back.all(telebot); //qual metodo chega? não precisa passar todos por aqui


const httpBack = http.Server(back);
const backServer = httpBack.listen(3000, function () {
    console.log('Back on port 3000!');
});
const websocket = socketIo.listen(backServer);

socketInput(websocket);

errorRoutes(back);

module.exports = back;