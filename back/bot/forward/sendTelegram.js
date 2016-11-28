const request = require('request');
const config = require('./../config');

module.exports = (messageData) => {
    request.post({
        url: 'https://api.telegram.org/bot' + config.TELEBOT_CODE + '/sendMessage',
        formData: messageData
    }, function (err, httpResponse, body) {
        if (err) {
            return console.error('There was an error:', err);
        }
        console.log('Sent!  Server responded with:', body);
    });
}