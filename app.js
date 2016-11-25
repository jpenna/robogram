const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

const front = require('./front/server');

const httpFront = http.Server(front);

const frontServer = httpFront.listen(3001, function () {
    console.log('Front on port 3001!');
});



// const back = require('./back/back');







// ----------------------------------
// errors and server
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