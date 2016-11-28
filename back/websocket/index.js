const sendNewChat = require('./sendNewChat');
const sendNewMessage = require('./sendNewMessage');
const prepareConnection = require('./prepareConnection');

function initSocket(socket) {

    prepareConnection(socket);

    return {
        sendMessage: sendNewMessage(socket),
        sendChat: sendNewChat(socket)
    }
}

module.exports = initSocket;