module.exports = (socket) => {
    return (user) => {
        socket.emit('new user', user);
    }
}