module.exports = {
    "ping": {
        "description": "Replies pong.",
        "args": 0,
        "fn": (bot, message) => {
            bot.reply(message, "pong");
        }
    },
    "joke": {
        "description": "Tells a joke.",
        "args": 0,
        "fn": (bot, message) => {
            bot.sendMessage(message.channel, "Why did I cross the road, foolish mortal?");
        }
    },
    "smite": {
        "description": "Smites a user.",
        "args": 1,
        "fn": (bot, message, args) => {
            target = message.mentions[0];
            bot.sendMessage(message.channel, target.mention() + ", I smite you!");
        }
    }
}