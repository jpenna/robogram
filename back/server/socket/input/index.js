const messageIn = require('./messageIn');
const disconnect = require('./disconnect');

function onConnection(websocket) {
    websocket.on('connection', function (socket) {
        console.log('a user connected');

        messageIn(socket);

        disconnect();
    });
}

module.exports = onConnection;