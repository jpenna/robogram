module.exports = (db, chatId, data) => {
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
}