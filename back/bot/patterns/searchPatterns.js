const start = require('./start');
const reply = require('./reply');

function getPattern(msg, cmd) {
    switch (cmd) {
        case 'sayhi':
            return ['Olá!', 'Como você está?'];
            break;
        case 'whereareyou':
            return ['Here is where I am: -19.928232, -43.9439383', "Don't visist me.", "Just kidding! 😄", "or not."];
            break;
        case 'id':
            return "Your id is: " + msg.chat.id;
            break;
        case 'saybye':
            return "See you later! 👋";
            break;
        default:
            return "I don't know what this command mean ☹️";
            break;
    }
}

module.exports = (msg, res, websocket) => {

    const chatId = msg.chat.id;

    if (msg.hasOwnProperty('command')) {

        let cmd = msg.command;

        if (cmd == 'start') {
            start(chatId, msg, res, websocket);

        } else {

            const response = getPattern(msg, cmd);

            if (typeof response == 'string') {
                reply(chatId, response, res, websocket);
            } else {
                if (cmd == 'whereareyou') {
                    res.location(-19.928232, -43.9439383);
                }
                // if array of +messages
                for (let message of response) {
                    reply(chatId, message, res, websocket);
                }
            }
        }
    } else {
        let message = `Hi, ${msg.chat.firstname} ${msg.chat.lastname}! I don't know what you mean... Try using the predefined actions! 😊`;
        reply(chatId, message, res, websocket);
    }

}