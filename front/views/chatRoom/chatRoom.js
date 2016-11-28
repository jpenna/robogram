var express = require('express');
var chatRoom = express.Router();
const axios = require('axios');

chatRoom.get('/chatRoom', function (req, res, next) {

    console.log(req.path);
    console.log('teste');

    axios.get('http://localhost:3000/getInitialState').then(function (response) {

        const items = response.data;

        if (items.length == 0) {
            res.render('chatRoom/emptyChats');

        } else {

            var initialState = {};
            initialState.activeId = items[0].chat_id;
            initialState.chats = {};

            console.log('iterar chat');


            for (let item of items) {

                // get basic chat info
                let chatInfo = {
                    first_name: item.first_name,
                    last_name: item.last_name,
                    avatar: item.avatar,
                    conversation: []
                }

                // set messages in chat info
                for (let talk of item.conversation) {
                    chatInfo.conversation.push({
                        author: talk.name,
                        type: talk.type,
                        message: talk.text,
                        date: talk.date
                    })
                }

                //insert in initialState
                initialState.chats[item.chat_id] = chatInfo;
            }

            res.render('chatRoom/chatRoom', {initialState: JSON.stringify(initialState)});
        }

    }).catch(function (error) {
        console.log(error);

    });

});


module.exports = chatRoom;