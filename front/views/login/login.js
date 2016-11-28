const path = require('path');
const facebook = require('./facebookLogin/facebook.config.js');
const facebookLogin = require('./facebookLogin/facebookLogin');
const login = require('express').Router();

//replace false for check login
//     if (false == true) {
//         next('chat');
//     } else {

login.get(['/login', '/'], renderLogin);

login.post('/auth', facebookLogin(facebook));


function renderLogin(req, res) {

    const FBLoginData = {
        appId: facebook.app_id,
        csrf: facebook.csrf_guid,
        version: facebook.account_kit_api_version
    };

    res.render('login/login', FBLoginData);
}

module.exports = login;