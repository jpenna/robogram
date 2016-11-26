const botgram = require('botgram'),
    bot = botgram("266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM");

bot.command("start", function (req, res, next) {
    res.text("Alllll right! Let's ROCK! 🤘️");
    res.text("Tell me, what can I do for you " + req.chat.name + "?");
});

bot.text(function (req, res, next) {
    res.text("Hi, " + req.chat.firstname + " " + req.chat.lastname + "! Try using the predefined actions 😊");
    res.text("Unfortunately I'm still a little stupid... 😅");
});

bot.command("whereareyou", function (req, res, next) {
    res.text("I'm at:");
    res.location(-19.928232, -43.9439383);
});

bot.command("id", function (req, res, next) {
    res.text("Your id is: " + req.chat.id);
});

bot.command("sayhi", function (req, res, next) {
    res.text("Hi!");
});

bot.command("saybye", function (req, res, next) {
    res.text("See you later!");
});

bot.all(function (req, res, next) {
    res.text("Hummm, that seems nice... I don't know...");
});