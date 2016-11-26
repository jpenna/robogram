module.exports = (socket, user) => {
    socket.emit('new user', user);
}