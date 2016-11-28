const models = require('../models');
const config = require('../config');

module.exports = (msg, res, websocket) => {

    let chatId = msg.chat.id;

    let msgData = {
        name: msg.chat.name,
        type: 'client',
        text: msg.text,
        date: new Date()
    }

    models.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;
    websocket.sendMessage(msgData);
}