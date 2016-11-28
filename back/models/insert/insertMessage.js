const checkIfChatExists = require('../find/checkIfChatExists');


module.exports = (db, data) => {
    console.log("insert message");

    var collection = db.collection('chats');

    var model = {
        name: data.name,
        type: data.type,
        text: data.text,
        date: data.date
    }

    console.log('MODEL INSERT MESSAGE', model);

    collection.updateOne({"chat_id": data.id},
        {$push: {"conversation": model}},
        function (err, result) {
            db.close();
            if (err === null) {
                return result.result.n == 1;
            }
            console.log(err);
            return false;
        })
}