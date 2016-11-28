const models = require('../models');
const bot = require('../bot');
const config = require('./../config');

module.exports = (data) => {

    let msgData = {
        id: data.id,
        name: config.BOT_NAME,
        type: 'user',
        text: data.text,
        date: new Date()
    }

    let msgModel = models.model.getMessageModel(msgData);
    models.insertMessage(msgModel);

    var formData = {
        chat_id: data.chatId,
        text: data.text
    };

    bot.sendTelegram(formData);
}