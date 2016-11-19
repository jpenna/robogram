var botgram = require('botgram');
var bot = botgram("266093667:AAEU-ML9BamR6jQEMPFKMcOGPdxKGrZNyCM");

bot.command("start", function (msg, reply, next) {
    console.log("Received a /start command from", msg.from.username);
});

bot.text(function (msg, reply, next) {
    console.log(msg);
    console.log("Received a text message:", msg.text);
    next();
});

bot.text(function (msg, reply, next) {
    reply.text("Hello, " + msg.chat.firstname + " " + msg.chat.lastname + "!");
    // reply.text("How are you?");
    // reply.text("Hope you are doing well 😄");
    next()
});

bot.command("whereareyou", function (msg, reply, next) {
    reply.text("I'm at:");
    reply.location(-19.928232, -43.9439383);
    next()
});

bot.command("id", function (msg, reply, next) {
    reply.text("Your id is: " + msg.chat.id);
    next()
});

bot.command("sayhi", function (msg, reply, next) {
    reply.text("Hi!");
    next()
});

bot.photo(function (msg, reply, next) {
    reply.sticker("BQADAgAD3gAD9HsZAAFphGBFqImfGAI");
    next()
});