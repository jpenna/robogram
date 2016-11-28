const botgram = require('botgram');
const config = require('../config');
const handleIncomming = require('./forward/handleIncomming');
const sendTelegram = require('./forward/sendTelegram');

const bot = botgram(config.BOT_CODE);

function init(websocket) {
    bot.all((msg, res) => {
        handleIncomming(msg, res, websocket);
    });
}

module.exports = {init, sendTelegram};