const Request = require('request');
const Querystring = require('querystring');
const fbConfig = require('./config');
const route = require('express').Router();

/*Facebook Account Kit logic*/
route.post('/', function (request, response) {
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
                user_id: respBody.id,
            };

            // get account details at /me endpoint
            var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json: true}, function (err, resp, respBody) {
                // send login_success.html
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

module.exports = route;