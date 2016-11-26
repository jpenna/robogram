module.exports = (socket) => {
    return (data) => {
        socket.emit('chat message', data);
    }
}