var botgram = require('botgram');
var bot = botgram("266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM");

var io;
var response;

function reply(msg) {
    io.send('Telebot: ' + msg);
    response.text(msg);
}

bot.all(function (req, res, next) {
    response = res;
    io.send(req.chat.firstname + ': ' + req.text);
    next();
});

bot.command("start", function (req, res, next) {
    let user = {name: req.chat.name};

    io.newUser(user);

    reply("Alllll right! Let's ROCK! 🤘️");
    reply("Tell me, what can I do for you " + req.chat.name + "?");
});

bot.text(function (req, res, next) {
    reply("Hi, " + req.chat.firstname + " " + req.chat.lastname + "! Try using the predefined actions 😊");
    reply("Unfortunately I'm still a little stupid... 😅");
});

bot.command("whereareyou", function (req, res, next) {
    reply("I'm at:");
    response.location(-19.928232, -43.9439383);
});

bot.command("id", function (req, res, next) {
    reply("Your id is: " + req.chat.id);
});

bot.command("sayhi", function (req, res, next) {
    reply("Hi!");
});

bot.command("saybye", function (req, res, next) {
    reply("See you later!");
});

bot.all(function (req, res, next) {
    reply("Hummm, that seems nice... I don't know...");
});

module.exports = function telebot(websocketIO) {
    io = websocketIO;
}