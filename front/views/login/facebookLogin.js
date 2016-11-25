const Request = require('request');
const Querystring = require('querystring');
const facebook = require('./facebook.ref');

/*Facebook Account Kit logic*/
module.exports = (req, res, next) => {
    new Promisse(function (resolve, reject) {
        var app_access_token = ['AA', facebook.app_id, facebook.app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            access_token: app_access_token
        };

        // exchange tokens
        var token_exchange_url = facebook.token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function (err, resp, respBody) {
            var view = {
                user_access_token: respBody.access_token,
                expires_at: respBody.expires_at,
                user_id: respBody.id
            };

            // get account details at /me endpoint
            var me_endpoint_url = facebook.me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json: true}, function (err, resp, respBody) {
                // send chatRoom.html
                if (respBody.phone) {
                    view.phone_num = respBody.phone.number;
                } else if (respBody.email) {
                    view.email_addr = respBody.email.address;
                }

                resolve(req, res, next);

            });


        });


    });


}
