(function() {
	// Load the Discord API
	var Discord = require("discord.js");
	var bot = new Discord.Client();

	// Get configuration files
	const cfg = require("./config.json");
	var modules = {};

	for (var item in cfg.modules) {
		temp = require(cfg.modules[item].path);
		modules[item] = new temp();
		modules[item].active = cfg.modules[item].active;
	}

	// TODO: Deactivate inactive modules

	// Log the bot into Discord
	bot.loginWithToken(cfg.auth.token, function(error) {
		if (error)
		{
			console.log("Error logging in!")
		}
	});
})();