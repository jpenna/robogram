const checkIfChatExists = require('../find/checkIfChatExists');

module.exports = (db, data) => {
    console.log("Insert Client");
    var collection = db.collection('chats');

    console.log('data', data);

    return checkIfChatExists(db, data).then(function (exist) {


        console.log('EXISTE OU NEM', exist);

        if (!exist) {
            return collection.insertOne(data, function (err, result) {
                db.close();
                if (err !== null) {
                    console.log(err);
                }
            });
        }
    });


}