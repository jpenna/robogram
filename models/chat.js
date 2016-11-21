const doConnectAnd = require('../controller/connectionFactory');

// Module to export
var chatExport = {};

/**
 * These are the schemas for conversation persistence
 *
 * */
chatExport.models = {
    chatModel: {
        chat_id: null,
        first_name: null,
        last_name: null,
        avatar_img: null,
        conversation: []
    },
    conversationModel: {
        name: null,
        text: null,
        date: null
    }
}

/**
 * Method to create a chat document in Chats collection
 *
 * @param data JSON create chat
 * @return result boolean on create success = true, fail = false
 *
 * */
chatExport.insertClient = function (data) {

    return doConnectAnd(
        function (db, callback) {
            var collection = db.collection('chats');

            collection.insertOne(data, function (err, result) {
                if (err === null) {
                    callback();
                    return result.result.n == 1;
                }
                console.log(err);
                return false;
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
    return doConnectAnd(
        function (db, callback) {
            var collection = db.collection('chats');

            collection.updateOne({"chat_id": chatId},
                {
                    $push: {"conversation": data}
                },
                function (err, result) {
                    if (err === null) {
                        callback();
                        return result.result.n == 1;
                    }
                    console.log(err);
                    return false;
                })
        });

}

//
// var findDocuments = function (db, callback) {
//     // Get the documents collection
//     var collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function (err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }
//
// var updateDocument = function (db, callback) {
//     // Get the documents collection
//     var collection = db.collection('documents');
//     // Update document where a is 2, set b equal to 1
//     collection.updateOne({a: 2}
//         , {$set: {b: 1}}, function (err, result) {
//             assert.equal(err, null);
//             assert.equal(1, result.result.n);
//             console.log("Updated the document with the field a equal to 2");
//             callback(result);
//         });
// }
//
// var removeDocument = function (db, callback) {
//     // Get the documents collection
//     var collection = db.collection('documents');
//     // Insert some documents
//     collection.deleteMany({adddd: 1}, function (err, result) {
//         assert.equal(err, null);
//         // assert.equal(1, result.result.n);
//         console.log("Removed: " + result.result.n);
//         callback(result);
//     });
// }
//
// //add index
// var indexCollection = function (db, callback) {
//     db.collection('documents').createIndex(
//         {"a": 1},
//         null,
//         function (err, results) {
//             console.log(results);
//             callback();
//         }
//     );
// };


module.exports = chatExport;