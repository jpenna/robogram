const receiveMessage = require('./receiveMessage');
const sendNewChat = require('./sendNewChat');
const sendNewMessage = require('./sendNewMessage');

function initSocket(socket) {
    socket.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('chat message', function (data) {
            receiveMessage(data);
        });


    });

    return {
        sendMessage: sendNewMessage(socket),
        sendChat: sendNewChat(socket)
    }
}

module.exports = initSocket;