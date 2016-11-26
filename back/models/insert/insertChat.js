module.exports = (db, data) => {
    console.log("Insert Client");
    var collection = db.collection('chats');

    return collection.insertOne(data, function (err, result) {
        db.close();
        if (err !== null) {
            console.log(err);
        }
    });
}