socket.on('new client', function (user) {

    console.log('new client: ', user );

    let userData = {
        chatId: user.chat_id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        conversation: []
    }

    console.log(userData)

    window.newUser(userData)
});

socket.on('chat message', function (msgObj) {

    console.log('chat message: ', msgObj );

    let msgData = {
        chatId: msgObj.id,
        author: msgObj.name,
        type: msgObj.type,
        text: msgObj.text,
        date: msgObj.date
    }

    console.log(msgData);

    window.newMessage(msgData)
});
