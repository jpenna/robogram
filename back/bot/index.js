const botgram = require('botgram');
const config = require('../config');
const patterns = require('./patterns');
const handleIncomming = require('./handleIncomming');
const sendTelegram = require('./sendTelegram');

const bot = botgram(config.TELEBOT_CODE);

function init(websocket) {

    bot.all((msg, res) => {
        handleIncomming(msg, res, websocket);
        patterns(msg, res, websocket);
    });
}

module.exports = {init, sendTelegram};