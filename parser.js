const cfg = require("./config.json");

Parser = function() { }

Parser.prototype.parse = (text) =>
{
    var args = text.split(" ");
    
    if (cfg.cmd.indexOf(args[0]) >= 0)
        return args.slice(1, args.length);
    else
        return null;
}

module.exports = new Parser();