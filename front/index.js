const express = require('express');
const path = require('path');
const http = require('http');
const front = express();

const login = require('./views/login');
const chatRoom = require('./views/chatRoom');

// View engine setup
front.set('views', path.join(__dirname, 'views'));
front.set('view engine', 'pug');

// Static paths
front.use('/static', express.static(path.join(__dirname, 'public')));
front.use('/scripts', express.static(path.join(__dirname, 'node_modules/socket.io-client/')));

// Routing
front.post('/chatroom', (req, res, next) => chatRoom(req, res, next));
front.get(['/', '/login'], login);


const httpFront = http.Server(front);
const frontServer = httpFront.listen(3001, function () {
    console.log('Front on port 3001!');
});


/*
 // render bundle.js on the fly
 var fs = require("fs");
 var browserify = require("browserify");
 var babelify = require("babelify");

 browserify({ debug: true })
 .transform(babelify)
 .require("src/front/views/chatRoom/components/chatRoom.react.js", { entry: true })
 .bundle()
 .on("error", function (err) { console.log("Error: " + err.message); })
 .pipe(fs.createWriteStream("src/front/public/scripts/bundle.js"));
 //DEV ENDD
 */


