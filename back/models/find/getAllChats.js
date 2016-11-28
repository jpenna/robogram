module.exports = (db) => {
    console.log("Get All Chats module");

    var collection = db.collection('chats');

    return collection.find({}).toArray().then((items) => {
        return items;
    });
}