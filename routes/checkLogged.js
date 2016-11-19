const express = require('express');
const path = require('path');
// const login = require('./login');
const login = require('./login');


const router = express.Router();

router.use(express.static(path.join(__dirname, '.../views')));



router.use(function (req, res, next) {
    if (false == true) { //replace false for check login
        next('chat');
    }
    router.use(login);
    next();

    // res.render('login');
    // res.sendFile('login.html', {root: path.join(__dirname, '../views')});
});

module.exports = router;
