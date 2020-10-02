const Discord = require("discord.js");
const fs = require('fs');
const request = require('request');
var Language = require('/app/Languages/English.json');

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.run = async (bot, message, args) => {
	if (bot.config.languages[message.guild.id] && bot.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
    message.channel.startTyping();
    var text = args.join(" ");
    request(
        "https://api.tenor.com/v1/search?q=anime cry&key=XF1I98YOKFEH&limit=40",
        function(error, response, body) {
            console.error("error:", error); // Print the error if one occurred
            console.log(response.statusCode);
            if (response && response.statusCode == 200) {
                var gifs = JSON.parse(body);
                var rand = parseInt(random(0, 39));
                gif = gifs.results[rand].media[0].gif.url;
                console.log(gif);
                const image = {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    author: {
                        name: message.author.username + Language.cryTextBefore + message.author.username + Language.cryTextAfter + text,
                        icon_url: message.author.displayAvatarURL()
                    },
                    image: {
                        url: gif,
                    },
                };
                message.channel.send({
                    embed: image
                });
            }
        });
    message.channel.stopTyping(true);
}

module.exports.config = {
    name: "cry",
    description: Language.help.cry,
    usage: "r!cry",
    accessableby: "Members",
	category: "👋 Interactions",
    aliases: ["khóc"]
}
