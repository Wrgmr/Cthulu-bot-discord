Parser = require("./parser.js");
//FileSystem = require('fs');

Debug = function() {
    this.fs = require('fs');
    this.cfg = require('./config.json');    
}

Debug.prototype.init = function() {
    // Import READLINE package.
    const readline = require("readline");

    // Create the interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Start debug console
    rl.setPrompt(">> ");
    rl.prompt();

    rl.on('line', (cmd) => {
        switch (cmd) {
            case "exit":
                process.exit();
                break;
            default:
                break;
        }
        rl.prompt();
    });
}

Debug.prototype.log = function(msg) {
    // Get timestamp
    var dt = new Date();
    var ts = dt.toUTCString();
    
    // Log to standard out
    if (this.cfg.log_to_console) console.log(ts + ": " + msg);
    
    // Log to filesystem
    if (this.cfg.log_to_file)
        this.fs.appendFile(this.cfg.log_path, ts + ": " + msg + "\n", (err) => {
            if (err) console.log("Error writing log data to file!\n");
        });
}

module.exports = new Debug();