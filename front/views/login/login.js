const path = require('path');
const facebook = require('./facebook.config.js');

//replace false for check login
//     if (false == true) {
//         next('chat');
//     } else {
function renderLogin(req, res) {

    const FBLoginData = {
        appId: facebook.app_id,
        csrf: facebook.csrf_guid,
        version: facebook.account_kit_api_version
    };

    const loginPath = path.join(__dirname, '/login');

    res.render(loginPath, FBLoginData);
}

module.exports = renderLogin;