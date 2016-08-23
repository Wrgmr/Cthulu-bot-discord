// Load the necessary modules
var Discord = require("discord.js");
var fs = require("fs");

// Create the bot
var bot = new Discord.Client();

// Load utils
const parser = require("./parser.js");
const debug = require("./debug.js");

// Get configuration data
const auth = require("./auth.json");
const cfg = require("./config.json");

// Load commands
cmd_lst = {}
dir = fs.readdirSync(cfg.commands);
for (var i in dir) {
	debug.log("Loading commands from " + i);
	pkg = require(cfg.commands + dir[i]);
	for (var j in pkg) {
		cmd_lst[j] = pkg[j];
	}
}
cmd_lst["help"] = {
	"description": "Displays available commands.",
	"args": 0,
	"fn": (bot, message) => {
		txt = "";
		for (var i in cmd_lst) {
			txt += (i + ": " + cmd_lst[i].description + "\n");
		}
		bot.sendMessage(message.channel, txt);
	}
}

// Command event
bot.on("message", function(message) {
	debug.log("Parsing Command: " + message.content);
	tokens = parser.tokenize(message.content).reverse();
	debug.log("Successfully Parsed Command: " + message.content);
	try {
		if (cfg.cmd.indexOf(tokens.pop().toLowerCase()) >= 0)
		{
			cmd = tokens.pop();
			if (cmd_lst[cmd].args === tokens.length)
			{
				cmd_lst[cmd].fn(bot, message, tokens);
				debug.log("Ran Valid Command: " + message.content);
			}
		}
	}
	catch (err) {
		bot.reply(message, "Command '" + message.content + "' is not valid.");
		debug.log("Invalid Command: " + message.content);
	}
});


// Log the bot into Discord
bot.loginWithToken(auth.token, function(error) {
	if (error) {
		debug.log("Error logging in!")
		process.exit();
	}
	else {
		debug.log("Logged in successfully!");
		debug.init();
	}
});