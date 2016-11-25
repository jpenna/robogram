var refs = require('../helper/refs'),
    MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = refs.MONGODB_URL;

// Module to export
var chatExport = {};

/**
 * These are the schemas for conversation persistence
 *
 * */
// models = {
//     chatModel: {
//         chat_id: null,
//         first_name: null,
//         last_name: null,
//         avatar_img: null,
//         conversation: []
//     },
//     conversationModel: {
//         name: null,
//         type: ['bot', 'user', 'client'],
//         text: null,
//         date: null
//     }
// }

/**
 * Method to create a chat document in Chats collection
 *
 * @param data JSON create chat
 * @return result boolean on create success = true, fail = false
 *
 * */
chatExport.insertClient = function (data) {

    MongoClient.connect(url).then(function (db) {
        console.log("Insert Client");
        var collection = db.collection('chats');

        collection.insertOne(data, function (err, result) {
            db.close();
            if (err !== null) {
                console.log(err);
            }
        });
    });
}

/**
 * Method to insert new messages on chat
 *
 * @param chatId int id of the chat
 * @param data JSON message (as expressed by the template)
 * @return result boolean on insert success = true, fail = false
 *
 * */
chatExport.insertMessage = function (chatId, data) {
    MongoClient.connect(url).then(function (db) {
        console.log("insert message");

        var collection = db.collection('chats');

        collection.updateOne({"chat_id": chatId},
            {
                $push: {"conversation": data}
            },
            function (err, result) {
                db.close();
                if (err === null) {
                    return result.result.n == 1;
                }
                console.log(err);
                return false;
            })
    });


}

/**
 * Method get people in chats
 *
 * @return promise items list of chats and conversations
 *
 * */
chatExport.getChat = function () {

    return MongoClient.connect(url).then(function (db) {
        console.log("get chat");

        var collection = db.collection('chats');

        return collection.find({}).toArray()

    }).then(function(items) {
        return items;
    });
}


module.exports = chatExport;