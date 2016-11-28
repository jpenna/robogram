const models = require('../../models');
const reply = require('./../forward/reply');

module.exports = (msg, res, websocket) => {

    var chatData = {
        id: msg.chat.id,
        firstName: msg.chat.firstname,
        lastName: msg.chat.lastname,
        avatar: 'x',
        name: msg.chat.firstname,
        type: 'client',
        text: msg.text,
        date: new Date()
    }

    var chat = models.model.getChatModel(chatData);

    models.insertChat(chat).then(() => {

            let msgData = models.model.getMessageModel(chatData);

            models.insertMessage(msgData);

            let message = "Alllll right! Let's ROCK! 🤘️";
            reply(msg, message, res, websocket);

            message = "Tell me, what can I do for you " + msg.chat.name + "?";
            reply(msg, message, res, websocket)
        }
    );

    websocket.sendChat(chat);
}