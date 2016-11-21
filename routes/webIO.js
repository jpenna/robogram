const refs = require('../helper/refs');

var webIO = {};

webIO.sendMessageChat = function (obj) {
    mySocket.emit('chat message', obj);
}

webIO.sendNewUser = function (user) {
    mySocket.emit('new user', user);
}

module.exports = webIO;