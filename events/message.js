const request = require("request");

module.exports = async (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    // Assign the current prefix first
    var prefix = client.config.prefix;
    // Detect if it was a Guild Chat, if yes, go to the Custom Prefixes part
    if (message.channel.type == "text") {
        // If the client.config.customPrefixes was null, refresh it
        if (!client.config.customPrefixes) {
            request('http://hvnfollower.herokuapp.com/Richter_GetCustomPrefixes.php', function(error, response, body) {
                if (response && response.statusCode == 200 && !body.includes("Connection failed")) {
                    // Refreshing the prefixes list
                    client.config.customPrefixes = JSON.parse(body);
                    // Go to the Custom Prefix part
                    CustomPrefix();
                }
            });
        }
        else CustomPrefix();
    }
    
    // Custom Prefix part
    function CustomPrefix() {
        // Check if the server has a prefix, if yes, assign it as the current prefix
        if (client.config.customPrefixes[message.guild.id]) prefix = client.config.customPrefixes[message.guild.id];
    }
    
    // Done the Custom Prefix part.
   
    if (message.mentions.users.size)
    if (message.mentions.users.first().id == client.user.id) message.channel.send("The BOT's prefix on this server is " + prefix).then(message => {
        message.delete({timeout:5000});
    });
  
    // Ignore messages not starting with the prefix
    if (message.content.toLowerCase().indexOf(prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/\s+/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
};
