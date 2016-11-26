module.exports = (socket) => {

    socket.on('chat message', function (data) {
        var chatId = data.chatId;

        var msgData = {
            name: refs.TELEBOT_GUI_NAME,
            type: 'user',
            text: data.text,
            date: new Date()
        }

        console.log(msgData);

        chatModel.insertMessage(chatId, msgData);

        var formData = {
            chat_id: chatId,
            text: data.text
        };

        console.log('formData', formData);

        request.post({
            url: 'https://api.telegram.org/bot266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM/sendMessage',
            formData: formData
        }, function (err, httpResponse, body) {
            if (err) {
                return console.error('There was an error:', err);
            }
            console.log('Sent!  Server responded with:', body);
        });
    });

};