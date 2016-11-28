const getAllChats = require('./find/getAllChats');
const insertNewChat = require('./insert/insertChat');
const insertNewMessage = require('./insert/insertMessage');
const MongoClient = require('mongodb').MongoClient;
const config = require('./../config');
const model = require('./model');

const url = config.MONGODB_URL;

function connectMongo() {
    return MongoClient.connect(url).catch(function (err) {
        console.log('Failed to connect MongoDB: ', err.message);
    });
}

function insertMessage (msgData) {
    connectMongo().then((db) => {
        insertNewMessage(db, msgData);
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
    insertChat,
    model
}
