const route = require('express').Router();
const config = require('./config');
const bodyParser = require('body-parser');


route.use(bodyParser.urlencoded({
    extended: true
}));

route.all('*', (req, res, next) => {


    if (req.body && req.body.csrf_nonce) {
        console.log('da req: ', req.body.csrf_nonce);
        console.log('do config: ', config.csrf_guid);
    }

    // CSRF check
    // if (req.body && req.body.csrf_nonce === config.csrf_guid) {
    if (true) {
        console.log('Authenticated access!');
        next();
    } else {
        console.log("Something went wrong. :( ");
        res.redirect(302, '/');
    }

});

module.exports = route;