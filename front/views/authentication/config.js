const Guid = require('guid');

module.exports = {
    csrf_guid: Guid.raw(),
    account_kit_api_version: 'v1.1',
    app_id: '1647210538911602',
    app_secret: '3d81a108d5a824f04f579ba078a73d77',
    me_endpoint_base_url: 'https://graph.accountkit.com/v1.1/me',
    token_exchange_base_url: 'https://graph.accountkit.com/v1.1/access_token'
}