const models = require('../../models/index');
const patterns = require('../patterns');


module.exports = (msg, res, websocket) => {

    let data = {
        id: msg.chat.id,
        name: msg.chat.name,
        type: 'client',
        text: msg.text,
        date: new Date()
    }

    let msgData = models.model.getMessageModel(data);

    models.insertMessage(msgData);
    websocket.sendMessage(msgData);

    patterns.searchPatterns(msg, res, websocket);
}