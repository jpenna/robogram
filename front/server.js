const express = require('express');
const path = require('path');
const server = express();

const login = require('./views/login');
const chatRoom = require('./views/chatRoom');

// View engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

// Static paths
server.use('/static', express.static(path.join(__dirname, 'public')));
server.use('/scripts', express.static(path.join(__dirname, 'node_modules/socket.io-client/')));

// Routing
server.get(['/', '/login'], login);
server.get('/chatRoom', chatRoom);

module.exports = server;


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


