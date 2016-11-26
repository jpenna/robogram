const models = require('../../models');
const reply = require('./reply');

module.exports = (chatId, msg, res, websocket) => {

    var chat = {
        chat_id: chatId,
        first_name: msg.chat.firstname,
        last_name: msg.chat.lastname,
        avatar: 'x',
        conversation: [{
            name: msg.chat.firstname,
            type: 'client',
            text: msg.text,
            date: new Date()
        }]
    }

    models.insertChat(chat).then(() => {

            let message = "Alllll right! Let's ROCK! 🤘️";
            reply(chatId, message, res, websocket);

            message = "Tell me, what can I do for you " + msg.chat.name + "?";
            reply(chatId, message, res, websocket)
        }
    );

    websocket.sendChat(chat);
}