const botgram = require('botgram'),
    bot = botgram("266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM"),
    controller = require('../controller/controller');

var request;
var response;

function reply(msg) {
    controller.handleBotReply(request, response, msg);
}

bot.command("start", function (req, res, next) {
    controller.handleFirstContact(req, res);
    next();
});

bot.all(function (req, res, next) {
    request = req;
    response = res;
    controller.handleIncomingMessage(req);
    next();
});

bot.command("start", function (req, res, next) {
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
    controller.sendGuiOnly(req, 'I sent a map with the location (-19.928232, -43.9439383) to your Telegram App!');
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

// module.exports = function telebot(websocketIO) {
//     websocket = websocketIO;
// }