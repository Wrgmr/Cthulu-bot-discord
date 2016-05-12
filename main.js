// Load the necessary modules
var Discord = require("discord.js");
var fs = require("fs");

// Create the bot
var bot = new Discord.Client();

// Initialize the parser
const parser = require("./parser.js");

// Get configuration data
const auth = require("./auth.json");
const cfg = require("./config.json");

// Load debug console
const debug = require("./debug.js");

bot.on("message", function(message) {
	cmds = parser.tokenize(message.content).reverse();
	if (cfg.cmd.indexOf(cmds.pop()) >= 0)
	{
		bot.sendMessage(message.channel, "You requested my assistance: " + cmds);
	}
});

// Load plugins
plugins = fs.readdirSync(cfg.plugins);
for (var i in plugins) {
	require(cfg.plugins + plugins[i]).init(bot);
}

// Log the bot into Discord
bot.loginWithToken(auth.token, function(error) {
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