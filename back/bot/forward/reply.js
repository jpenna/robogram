const models = require('../../models/index');
const config = require('../../config');

module.exports = (msg, message, res, websocket) => {
    res.text(message); //reply with BOT

    let data = {
        id: msg.chat.id,
        name: config.BOT_NAME,
        type: 'bot',
        text: message,
        date: new Date()
    }

    let msgData = models.model.getMessageModel(data);


    console.log('REPLY: ', msgData);

    models.insertMessage(msgData);
    websocket.sendMessage(msgData);
}