const express = require('express');
const path = require('path');
const http = require('http');
const facebookLogin = require('./views/authentication/facebookLogin');
const authenticate = require('./views/authentication/authenticate');
const front = express();

const chatRoom = require('./views/chatRoom');
const login = require('./views/login');


// Static paths
front.use('/static', express.static(path.join(__dirname, 'public')));
front.use('/scripts', express.static(path.join(__dirname, '../node_modules/socket.io-client/')));

// view engine setup
front.set('views', path.join(__dirname, 'views'));
front.set('view engine', 'pug');

// Routing
front.post('/auth', facebookLogin);
front.get(['/login', '/'], login);

front.use(authenticate);
front.get('/chatRoom', chatRoom);

front.use((req, res) => {
    res.redirect(404, '/login');
})

const httpFront = http.Server(front);
const frontServer = httpFront.listen(3001, function () {
    console.log('Front on port 3001!');
});

module.exports = front;












