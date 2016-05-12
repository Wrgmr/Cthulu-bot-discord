Parser = require("./parser.js");

Debug = function()
{
    
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

module.exports = new Debug();