const facebook = require('../authentication/config');
const login = require('express').Router();

login.get(['/', '/login'], (req, res) => {

    const FBLoginData = {
        appId: facebook.app_id,
        csrf: facebook.csrf_guid,
        apiVersion: facebook.account_kit_api_version
    };

    res.render('login/login', FBLoginData);
});

module.exports = login;