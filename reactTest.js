var express = require('express');
var path = require('path');
var app = express();

var fs = require('fs')

var browserify = require('browserify');
var React = require('react');
const reactDOMServer = require('react-dom/server');
var babel = require('babel-register');


app.set('views', './views');
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', function (req, res, next) {

    var TelebotApp = require('./components/TelebotApp')({value: 'ok'});

    console.log(TelebotApp);

    // Render React to a string, passing in our fetched tweets
    var markup = reactDOMServer.renderToString(TelebotApp);

    // Render our 'home' template
    res.render('index', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify('ok'), // Pass current state to client side
        title: 'Hey',
        message: 'How are you?'
    });


    //
    //
    // var reactComponent = reactDOMServer.renderToStaticMarkup(renderAth);
    //
    // // console.log(reactComponent);
    //
    // res.render('index', {title: 'Hey', message: 'How are you?', react: reactComponent});
})


// app.use('/birds', birds);

// app.use('/:id', function (req, res, next) {
//         console.log('function use');
//         console.log(req.params);
//         if (req.params.id != 0) {
//             next('route');
//         }
//         next();
//     },
//     function (req, res, next) {
//         res.send('wrong id')
//     })
//
// app.get('/', function (req, res, next) {
//     res.send('you are logged in');
// })


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

/*
 function c1(req, res, next) {
 console.log('c1');
 next();
 }

 function c2(req, res, next) {
 console.log('c2');
 next();
 }

 function response(req, res, next) {
 res.send(req.params);
 }


 app.get('/index/:nome.:value', function (req, res, next) {
 console.log('a proxima é ola vos');
 next();
 }, function (req, res, next) {
 console.log('olá vós!');
 next();
 }, [c1, c2, response]);

 */