const refs = require('../helper/refs'),
      request = require('request'),
      chatModel = require('../models/chat'),
       webIO = require('../routes/webIO');

var controller = {};

controller.handleFromSocket = function (data) {
    var chatId = 231095546;

    var msgData = {
        name: refs.TELEBOT_GUI_NAME,
        text: data.text,
        date: new Date()
    }

    chatModel.insertMessage(chatId, msgData);

    var formData = {
        chat_id: chatId,
        text: data.text
    };

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
        last_name: req.chat.lastname
    }

    if (chatModel.insertClient(chat)) {
        console.log('Client Inserted');
    } else {
        console.log('Error inserting new client')
    }
}

controller.handleIncomingMessage = function(req) {
    var msgData = {
        name: req.chat.firstname,
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
        text: msg,
        date: new Date()
    }

    var chatId = request.chat.id;
    chatModel.insertMessage(chatId, msgData);

    msgData.chat_id = chatId;
    webIO.sendMessageChat(msgData);
}

module.exports = controller;