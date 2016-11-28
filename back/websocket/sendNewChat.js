module.exports = (socket) => {
    return (user) => {
        socket.emit('new client', user);
    }
}