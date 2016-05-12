// Load the necessary modules
var Discord = require("discord.js");
var fs = require("fs");

// Create the bot
var bot = new Discord.Client();

// Initialize the parser
const parser = require("./parser.js");

// Get configuration data
const cfg = require("./config.json");

// Load utils
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
		process.exit();
	}
	else
	{
		console.log("Logged in successfully!");
		debug.init();
	}
});