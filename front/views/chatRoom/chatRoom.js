const path = require('path');
const fs = require('fs');
const http = require('http');
const facebook = require('../config/facebook.config');
const facebookLogin = require('./facebookLogin');
const config = require('../../config');

// CSRF check
module.exports = (req, res, next) => {
    if (!req.body || !req.body.csrf_nonce !== this.refs.csrf_guid) {
        console.log("Something went wrong. :( ");
        res.redirect(302, '/login');

    } else {

        facebookLogin(req, res, next, facebook).then(function () {

            let options = {
                hostname: config.BACK_HOST,
                port: config.BACK_PORT,
                path: '/getInitialData',
                method: 'GET',
            };

            let request = http.request(options, (res) => {

                console.log(res);
                //     initialState = {};
                //     initialState.activeId = items[0].chat_id;
                //     initialState.chats = {};
                //
                //     console.log('iterar chat');
                //
                //
                //     for (let i = 0; i < items.length; i++) {
                //
                //         // get basic chat info
                //         let chatInfo = {
                //             first_name: items[i].first_name,
                //             last_name: items[i].last_name,
                //             avatar: items[i].avatar,
                //             messages: []
                //         }
                //
                //         // set messages in chat info
                //         for (let talk of items[i].conversation) {
                //             chatInfo.messages.push({
                //                 author: talk.name,
                //                 type: talk.type,
                //                 message: talk.text,
                //                 date: talk.date
                //             })
                //         }
                //
                //         //insert in initialState
                //         initialState.chats[items[i].chat_id] = chatInfo;
                //     }
                //
                //     console.log('renderizar chat');
                //
                //
                //     res.render(path.join(__dirname, '.../views', 'chatRoom'), {
                //         initialState: JSON.stringify(initialState)
                //     });
                //
                // }, function (err) {
                //     console.error('The promise was rejected', err, err.stack);
                // });
            });

            request.end();
        });
    }
}