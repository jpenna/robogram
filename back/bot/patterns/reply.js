const models = require('../../models');
const config = require('../../config');

module.exports = (chatId, message, res, websocket) => {
    res.text(message); //reply with BOT

    var msgData = {
        name: config.TELEBOT_NAME,
        type: 'bot',
        text: message,
        date: new Date()
    }

    models.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;
    websocket.sendMessage(msgData);
}