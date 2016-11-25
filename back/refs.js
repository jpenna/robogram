//set your mongodb database path
const mongodb_host = 'localhost',
    mongodb_port = '27017',
    mongodb_db_name = 'telebotTest';

const refs = {
    MONGODB_URL: 'mongodb://' + mongodb_host + ':' + mongodb_port + '/' + mongodb_db_name,
    TELEBOT_GUI_NAME: 'Telebot',
    TELEBOT_NAME: 'Telebot'
}

module.exports = refs;