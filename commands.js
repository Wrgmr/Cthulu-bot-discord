exports.init = function(bot) 
{
    bot.on("message", function(message) {
        if(message.content === "ping") {
            bot.reply(message, "pong");
        }
        if (message.content === "Cthulhu, tell me a joke.") {
            bot.reply(message, "Someone told me a joke about penguins rowing a boat in the desert. I smote them.");
        }
        if (message.content === "Cthulhu, can you repeat that?") {
            bot.reply(message, "Cthulhu, can you repeat that?");
        }
    });
}
