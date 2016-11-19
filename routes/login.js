const express = require('express');
const path = require('path');
const fs = require('fs');
const Guid = require('guid');
const bodyParser = require("body-parser");
// const Mustache  = require('mustache');
const Request = require('request');
const Querystring = require('querystring');
const login = express.Router();

login.use(express.static(path.join(__dirname, '.../views')));


login.use(bodyParser.urlencoded({extended: false}));
login.use(bodyParser.json());

var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.1';
const app_id = '1647210538911602';
const app_secret = '3d81a108d5a824f04f579ba078a73d77';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';


// login.get('/', function (req, res, next) {
//     res.sendFile('chatRoom.html', {root: path.join(__dirname, '/dist')});
// });


// login page logic
// function loadLogin() {
//     return fs.readFileSync('dist/login.html').toString();
// }

login.get('/', function (req, res, next) {
    if (false == true) { //replace false for check login
        next('chat');
    }

    var view = {
        appId: app_id,
        csrf: csrf_guid,
        version: account_kit_api_version
    };

    res.render('login', view);


    // var html = Mustache.to_html(loadLogin(), view);
    // response.send(html);
    // response.sendFile('login.html', {root: path.join(__dirname, '/dist')});
});


// login success
function loadLoginSuccess() {
    return fs.readFileSync('dist/chatRoom.html').toString();
}

login.post('/sendcode', function (request, response) {
    console.log('code: ' + request.body.code);

    // CSRF check
    if (request.body.csrf_nonce === csrf_guid) {
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: request.body.code,
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
                var html = Mustache.to_html(loadLoginSuccess(), view);
                response.send(html);
            });
        });
    }
    else {
        // login failed
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end("Something went wrong. :( ");
    }
});

module.exports = login;