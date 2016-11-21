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


login.get('/', function (req, res, next) {
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
});


login.post('/sendcode', function (req, res) {
    console.log('code: ' + req.body.code);

    // CSRF check
    if (req.body.csrf_nonce === csrf_guid) {
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            access_token: app_access_token
        };

        // exchange tokens
        var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function (err, resp, respBody) {
            var view = {
                user_access_token: respBody.access_token,
                expires_at: respBody.expires_at,
                user_id: respBody.id
            };

            // get account details at /me endpoint
            var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json: true}, function (err, resp, respBody) {
                // send chatRoom.html
                if (respBody.phone) {
                    view.phone_num = respBody.phone.number;
                } else if (respBody.email) {
                    view.email_addr = respBody.email.address;
                }

                controller.getChats()
                    .then(function (items) {
                        console.info('em login', items);

                        var jsonMessages = [];
                        var jsonClients = [];

                        for (let i = 0; i < items.length; i++) {
                            jsonClients.push({
                                chat_id: items[i].chat_id,
                                name: items[i].first_name + ' ' + items[i].last_name,
                                last_conversation: jsonMessages.conversation[jsonMessages.conversation.length -1]
                            });
                            jsonMessages = items[i].conversation;
                        }

                        var view = {
                            jsonMessages: JSON.stringify(jsonMessages),
                            jsonClients: JSON.stringify(jsonClients)
                        }

                        res.render('chatRoom', view);

                    }, function (err) {
                        console.error('The promise was rejected', err, err.stack);
                    });
            });
        });
    }
    else {
        // login failed
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("Something went wrong. :( ");
    }
});

module.exports = login;