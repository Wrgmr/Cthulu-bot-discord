(function() {
	// Load the Discord API
	var Discord = require("discord.js");
	var bot = new Discord.Client();

	// Get configuration files
	const cfg = require("./config.json");
	var modules = {};

	// TODO: Revamp module system
	for (var item in cfg.modules) {
		temp = require(cfg.modules[item].path);
		modules[item] = new temp();
		modules[item].active = cfg.modules[item].active;
	}

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

	// Log the bot into Discord
	bot.loginWithToken(cfg.auth.token, function(error) {
		if (error)
		{
			console.log("Error logging in!")
		}
	});
})();