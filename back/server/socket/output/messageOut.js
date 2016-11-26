module.exports = (socket, obj) => {
    socket.emit('chat message', obj);
}