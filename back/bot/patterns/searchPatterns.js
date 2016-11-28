const start = require('./start');
const getResponse = require('./getResponse');
const reply = require('./../forward/reply');

module.exports = (msg, res, websocket) => {

    if (msg.hasOwnProperty('command')) {

        let cmd = msg.command;

        if (cmd == 'start') {
            start(msg, res, websocket);

        } else {

            const response = getResponse(msg, cmd);

            if (typeof response == 'string') {
                reply(msg, response, res, websocket);
            } else {
                if (cmd == 'whereareyou') {
                    res.location(-19.928232, -43.9439383);
                }
                // if array of +messages
                for (let message of response) {
                    reply(msg, message, res, websocket);
                }
            }
        }
    } else {
        let message = `Hi, ${msg.chat.firstname} ${msg.chat.lastname}! I don't know what you mean... Try using the predefined actions! 😃`;
        reply(msg, message, res, websocket);

    }
}