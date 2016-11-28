const receiveMessage = require('./receiveMessage');

module.exports = (socket) => {
  socket.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    socket.on('chat message', function (data) {
      receiveMessage(data);
    });
  });
}