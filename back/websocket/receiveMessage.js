const models = require('../models');
const bot = require('../bot');
const config = require('./../config');

module.exports = (data) => {
    var chatId = data.chatId;

    var msgData = {
        name: config.TELEBOT_NAME,
        type: 'user',
        text: data.text,
        date: new Date()
    }

    console.log(msgData);

    models.insertMessage(chatId, msgData);

    var formData = {
        chat_id: chatId,
        text: data.text
    };

    console.log('formData', formData);

    bot.sendTelegram(formData);
}