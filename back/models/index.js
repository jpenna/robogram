const getAllChats = require('./find/getAllChats');
const insertNewChat = require('./insert/insertChat');
const insertNewMessage = require('./insert/insertMessage');
const MongoClient = require('mongodb').MongoClient;
const config = require('./../config');

const url = config.MONGODB_URL;

function connectMongo() {
    return MongoClient.connect(url);
}

function insertMessage (chatId, msgData) {
    connectMongo().then((db) => {
        insertNewMessage(db, chatId, msgData);
    })
}

function insertChat (data) {
    return connectMongo().then((db) => {
        return insertNewChat(db, data);
    })
}

function getInitialState (req, res) {
    connectMongo().then((db) => {
        getAllChats(db).then((items) => {
            res.send(items);
        });
    })
}

module.exports = {
    getInitialState,
    insertMessage,
    insertChat
}
