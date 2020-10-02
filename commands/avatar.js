const Discord = require("discord.js");
const fs = require('fs');
const request = require('request');
var Language = require('/app/Languages/English.json');

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.run = async (bot, message, args) => {
	if (bot.config.languages[message.guild.id] && bot.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
   var member = message.author;
        if (message.mentions.users.size) {
            member = message.mentions.users.first();
        }
        if (!message.mentions.users.size && args[0]) {
            member = client.users.cache.get(args[0]);
        }
        const infoMessage = {
            color: 0x0099ff,
            author: {
                name: Language.avatarText + member.username,
                url: member.avatarURL({
                  format: "jpg",
                  dynamic: true,
                  size: 2048
                })
            },
            image: {
                url: member.avatarURL({
                  format: "jpg",
                  dynamic: true,
                  size: 2048
                })
            }
        };
        message.channel.send({
            embed: infoMessage
        });
}

module.exports.config = {
    name: "avatar",
    description: Language.help.avatar,
    usage: "r!avatar <mention/ID>",
    accessableby: "Members",
	category: "🙋 Member information",
    aliases: []
}
