var refs = require('../helper/refs'),
    MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = refs.MONGODB_URL;

// Use connect method to connect to the server
function doConnectAnd (execute) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected successfully to MongoDB server");

        function closeDB() {
            console.log('called closeDB');
            db.close();
        }

        return execute(db, closeDB);
    });
}

module.exports = doConnectAnd;