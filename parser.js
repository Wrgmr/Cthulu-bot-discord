Parser = function() { }

Parser.prototype.tokenize = (text) =>
{
    lst = []
    token = "";
    state = 0;
    
    for (var i = 0; i < text.length; i++)
    {
        ch = text.charAt(i);
        
        switch(state) {
            // The character is outside of a quote block.
            case 0:
                if (ch === '\"') {
                    state = 1;
                }
                else if (ch === ' ') {
                    if (token) lst.push(token);
                    token = "";
                }
                else {
                    token += ch;
                }
                break;
            // The character is inside a quote block.
            case 1:
                if (ch === '\"') {
                     state = 0;
                     if (token) lst.push(token);
                     token = "";
                }
                else {
                    token += ch;
                }
                break;
            
        }
    }
    
    if (token) lst.push(token);
    return lst;
}

module.exports = new Parser();