module.exports = (db, data) => {
    var collection = db.collection('chats');

    let chatId = data.chat_id;

    return collection.findOne({chat_id: chatId}).then((exist) => {

        console.log('chatId:', chatId);

        return exist != null;

    }).catch(function (err) {
        console.log(err);
    });
}