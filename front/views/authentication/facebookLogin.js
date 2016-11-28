const Request = require('request');
const Querystring = require('querystring');
const bodyParser = require('body-parser');
const fbConfig = require('./config');
const route = require('express').Router();

route.use(bodyParser.urlencoded({
    extended: true
}));

console.log('auth 23');

/*Facebook Account Kit logic*/
route.post('/auth', function (req, res, next) {
    // console.log('code: ' + req.body.code);
    // console.log('code: ' + req.body.csrf_nonce);

    console.log('auth 444');


    // CSRF check
    // if (req.body.csrf_nonce === req.body.csrf_nonce) {
    if (true) {
        var app_access_token = ['AA', fbConfig.app_id, fbConfig.app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            access_token: app_access_token
        };

        // exchange tokens
        var token_exchange_url = fbConfig.token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function (err, resp, respBody) {
            var view = {
                user_access_token: respBody.access_token,
                expires_at: respBody.expires_at,
                user_id: respBody.id,
            };

            // get account details at /me endpoint
            var me_endpoint_url = fbConfig.me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json: true}, function (err, resp, respBody) {
                // send login_success.html

                res.redirect(302, '/chatRoom');

            });
        });
    }
    else {
        // login failed
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("Something went wrong. :( ");
    }
});

module.exports = route;