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
	pkg = require(cfg.commands + dir[i]);
	for (var j in pkg) {
		cmd_lst[j] = pkg[j];
	}
}
cmd_lst["help"] = {
	"description": "Displays available commands.",
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
	tokens = parser.tokenize(message.content).reverse();
	try {
		if (cfg.cmd.indexOf(tokens.pop().toLowerCase()) >= 0)
		{
			cmd = tokens.pop();
			if (cmd_lst[cmd].args === tokens.length)
				cmd_lst[cmd].fn(bot, message, tokens);
		} 
	}
	catch (err) {
		bot.reply(message, "That command was not recognized.");
	}
});


// Log the bot into Discord
bot.loginWithToken(auth.token, function(error) {
	if (error) {
		console.log("Error logging in!")
		process.exit();
	}
	else {
		console.log("Logged in successfully!");
		debug.init();
	}
});