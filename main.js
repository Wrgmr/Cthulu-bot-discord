// Load the necessary modules
var Discord = require("discord.js");
var fs = require("fs");

// Create the 
var bot = new Discord.Client();

// Get configuration data
const cfg = require("./config.json");

// Load terminal
const debug = require("./debug.js");

// Load plugins
plugins = fs.readdirSync(cfg.plugins);
for (var i in plugins) {
	require(cfg.plugins + plugins[i]).init(bot);
}

// Log the bot into Discord
bot.loginWithToken(cfg.token, function(error) {
	if (error)
	{
		console.log("Error logging in!")
	}
});