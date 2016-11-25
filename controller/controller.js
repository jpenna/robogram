const refs = require('../helper/refs'),
    request = require('request'),
    chatModel = require('../models/chat'),
    webIO = require('../routes/webIO');

var controller = {};

controller.handleFromGui = function (data) {

    var chatId = data.chatId;

    var msgData = {
        name: refs.TELEBOT_GUI_NAME,
        type: 'user',
        text: data.text,
        date: new Date()
    }

    console.log(msgData);

    chatModel.insertMessage(chatId, msgData);

    var formData = {
        chat_id: chatId,
        text: data.text
    };

    console.log('formData', formData);

    request.post({
        url: 'https://api.telegram.org/bot266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM/sendMessage',
        formData: formData
    }, function (err, httpResponse, body) {
        if (err) {
            return console.error('There was an error:', err);
        }
        console.log('Sent!  Server responded with:', body);
    });
}

controller.handleBotReply = function (request, response, msg) {
    response.text(msg);

    var msgData = {
        name: 'Telebot',
        type: 'bot',
        text: msg,
        date: new Date()
    }

    var chatId = request.chat.id;
    chatModel.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;
    webIO.sendMessageChat(msgData);
}

controller.handleFirstContact = function (req, res) {
    var chat = {
        chat_id: req.chat.id,
        first_name: req.chat.firstname,
        last_name: req.chat.lastname,
        avatar: 'x',
        messages: [ ]
    }

    chatModel.insertClient(chat);

    webIO.sendNewUser(chat);

}

controller.handleIncomingMessage = function (req) {
    var msgData = {
        name: req.chat.firstname,
        type: 'client',
        text: req.text,
        date: req.date
    }

    var chatId = req.chat.id;
    chatModel.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;

    console.log(webIO);
    webIO.sendMessageChat(msgData);
}

controller.sendGuiOnly = function (request, msg) {
    var msgData = {
        name: 'Telebot',
        type: 'bot',
        text: msg,
        date: new Date()
    }

    var chatId = request.chat.id;
    chatModel.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;
    webIO.sendMessageChat(msgData);
}

controller.getChats = function() {
    return chatModel.getChat().then(function(items) {
        return items;
    }, function(err) {
        console.error('The promise was rejected', err, err.stack);
    });
}

module.exports = controller;