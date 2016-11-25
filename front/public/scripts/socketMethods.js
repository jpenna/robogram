socket.on('new user', function (user) {

    let userData = {
        chatId: user.chat_id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        messages: []
    }

    console.log(userData)

    window.newUser(userData)
});

socket.on('chat message', function (msgObj) {

    let msgData = {
        chatId: msgObj.chat_id,
        author: msgObj.name,
        type: msgObj.type,
        text: msgObj.text,
        date: msgObj.date
    }

    console.log(msgData);

    window.newMessage(msgData)
});
