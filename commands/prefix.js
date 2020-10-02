/*
------------------------------------------------------------
   Richter BOT v1.0.0 - Custom Prefix Settings
   Developed by LilShieru a.k.a Nico Levianth
   https://github.com/LilShieru
------------------------------------------------------------
*/

var Language = require('/app/Languages/English.json');
const request = require("request");

module.exports.config = {
    name: "prefix",
    description: Language.help.prefix,
    usage: "r!prefix [prefix]",
    accessableby: "Members",
    category: "👋 Config"
}

module.exports.run = async (client, message, args) => {
	if (client.config.languages[message.guild.id] && client.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
    // If no prefix was sent, return server's current prefix
    if (!args[0]) if (client.config.customPrefixes[message.guild.id]) return message.reply(Language.prefix.currentPrefix + "`" + client.config.customPrefixes[message.guild.id] + "`."); else return message.reply(Language.prefix.currentPrefix + "`r!`.");
    // Checking for permissions
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(Language.prefix.missingPermissions);
    // Connecting to the server
    request('https://hvnfollower.herokuapp.com/Richter_SetCustomPrefix.php?token=HHMuvWqDe5z6bT6zXBZDMcZfajqSHUyG&id=' + message.guild.id + "&prefix=" + encodeURIComponent(args[0]), function(err, response, body) {
        if (!response || response.statusCode != 200 || body.includes('Connection failed')) {
            message.channel.send(Language.prefix.connectionFailed);
        } else {
            if (body && body.includes('Success')) {
                request('http://hvnfollower.herokuapp.com/Richter_GetCustomPrefixes.php', function(error, response, body) {
                    if (response && response.statusCode == 200) {
                        // Refreshing the prefixes list
                        client.config.customPrefixes = JSON.parse(body);
                        message.reply(Language.prefix.prefixChanged + "`" + args[0] + "`.");
                    }
                });
            } else {
                message.reply(Language.errorOccured);
            }
        }
    });
}
