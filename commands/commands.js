module.exports = {
    "ping": {
        "description": "Replies pong.",
        "fn": (bot, message) => {
            bot.reply(message, "pong");
        }
    },
    "joke": {
        "description": "Tells a joke.",
        "fn": (bot, message) => {
            bot.sendMessage(message.channel, "Why did I cross the road?");
        }
    }
}