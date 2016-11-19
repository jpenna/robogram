const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();

const login = require('./routes/login');
const telebot = require('./routes/telebot');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//login.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all(telebot); //qual metodo chega? não precisa passar todos por aqui

app.use('/', login);

app.post('/sendBot', function (req, res, next) {
    var request = require('request');

    var text = req.body.text;
    console.log(text);

    var formData = {
        chat_id: 231095546,
        text: text
    };
    request.post({url:'https://api.telegram.org/bot266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM/sendMessage',
        formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Request sent!  Server responded with:', body);
    });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;

app.listen(3000, function () {
    console.log('Example login listening on port 3000!');
});