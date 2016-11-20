const request = require('request');
var io;

function initialize(http) {

    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('chat message', function (msg) {
            console.log('message: ' + msg);

            var formData = {
                chat_id: 231095546,
                text: msg
            };
            request.post({
                url: 'https://api.telegram.org/bot266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM/sendMessage',
                formData: formData
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Request sent!  Server responded with:', body);
            });

        });

        // socket.on('chat message', function (msg) {
        //     let response = 'eco: ' + msg;
        //     // io.emit('chat message', response);
        //     sendWS(response);
        // });

        // In order to send an event to everyone, Socket.IO gives us the io.emit:
        //
        // io.emit('some event', { for: 'everyone' });

        // If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
        //
        //     io.on('connection', function(socket){
        //         socket.broadcast.emit('hi');
        //     });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}

function send(msg) {
    io.emit('chat message', msg);
}

function newUser(user) {
    io.emit('new user', user);
}


module.exports = {
    init: initialize,
    send: send,
    newUser: newUser
}