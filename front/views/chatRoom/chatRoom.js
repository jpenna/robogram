const chatRoom = require('express').Router();
const path = require('path');
const fs = require('fs');
const http = require('http');
const request = require('request');
const axios = require('axios');
const facebookLogin = require('../login/facebookLogin/facebook.config');

chatRoom.get('/', function (req, res, next) {

    // // CSRF check
    // if (req.body.csrf_nonce === this.refs.csrf_guid) {
    //     console.log("Something went wrong. :( ");
    //     // res.redirect(302, '/login');
    //
    // } else {

    // facebookLogin(req, res, next, facebook).then(function () {
    //

    axios.get('http://localhost:3000/getInitialState').then(function (response) {

        const items = response.data;


        console.log(items);
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
                messages: []
            }

            // set messages in chat info
            for (let talk of item.conversation) {
                chatInfo.messages.push({
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

    }).catch(function (error) {
        console.log(error);

    });
});


module.exports = chatRoom;