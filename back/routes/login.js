const express = require('express');
const path = require('path');
const fs = require('fs');
const Guid = require('guid');
const bodyParser = require("body-parser");
// const Mustache  = require('mustache');
const Request = require('request');
const Querystring = require('querystring');
const login = express.Router();
const controller = require('../controller/controller');


login.use(express.static(path.join(__dirname, '.../views')));

login.use(bodyParser.urlencoded({extended: false}));
login.use(bodyParser.json());

var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.1';
const app_id = '1647210538911602';
const app_secret = '3d81a108d5a824f04f579ba078a73d77';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';

var getLogin = function (req, res, next) {
    if (false == true) { //replace false for check login
        next('chat');
    } else {

        var view = {
            appId: app_id,
            csrf: csrf_guid,
            version: account_kit_api_version
        };

        res.render('login', view);
    }
}


login.get('/', function (req, res, next) {
    getLogin(req, res, next);

});


login.post('/chatroom', function (req, res) {
    console.log('code: entrou no post');

    // CSRF check
    if (req.body.csrf_nonce === csrf_guid) {
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            access_token: app_access_token
        };

        console.log('primeiro if');


        // exchange tokens
        var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function (err, resp, respBody) {
            var view = {
                user_access_token: respBody.access_token,
                expires_at: respBody.expires_at,
                user_id: respBody.id
            };

            console.log('enviou request');


            // get account details at /me endpoint
            var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json: true}, function (err, resp, respBody) {
                // send chatRoom.html
                if (respBody.phone) {
                    view.phone_num = respBody.phone.number;
                } else if (respBody.email) {
                    view.email_addr = respBody.email.address;
                }

                console.log('buscar chat');


                controller.getChats()
                    .then(function (items) {
                        initialState = {}
                        initialState.activeId = items[0].chat_id
                        initialState.chats = {}

                        console.log('iterar chat');


                        for (let i = 0; i < items.length; i++) {

                            // get basic chat info
                            let chatInfo = {
                                first_name: items[i].first_name,
                                last_name: items[i].last_name,
                                avatar: items[i].avatar,
                                messages: []
                            }

                            // set messages in chat info
                            for (let talk of items[i].conversation) {
                                chatInfo.messages.push({
                                    author: talk.name,
                                    type: talk.type,
                                    message: talk.text,
                                    date: talk.date
                                })
                            }

                            //insert in initialState
                            initialState.chats[items[i].chat_id] = chatInfo;
                        }

                        console.log('renderizar chat');


                        res.render('chatRoom', {
                            initialState: JSON.stringify(initialState)
                        });

                    }, function (err) {
                        console.error('The promise was rejected', err, err.stack);
                    });
            });
        });
    }
    else {
        // login failed
        console.log("Something went wrong. :( ");
        getLogin(req, res);
// res.redirect(302, redirectLocation.pathname + redirectLocation.search); // isso funciona? se funcionar nao precisa separar o get login em outra funçao
    }
})
;

module.exports = login;