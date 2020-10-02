const Discord = require("discord.js");
const fs = require('fs');
var Language = require('/app/Languages/English.json');

module.exports.run = async (client, message, args) => {
	if (client.config.languages[message.guild.id] && client.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(Language.missingPermissions);
        if (!message.mentions.members.size) return message.reply(Language.mentionSomeoneFirst);
        if (message.mentions.members.first().id == message.author.id) return message.reply(Language.cannotBanYourself);
        if (message.mentions.members.first().roles.highest.position >= message.member.roles.highest.position) return message.reply(Language.higherRoleThanYou);
        if (message.mentions.members.first().roles.highest.position >= message.guild.member(client.user.id).roles.highest.position) return message.reply(Language.higherRoleThanBOT);
        if (message.mentions.members.first().id == client.user.id) return message.reply(Language.cannotBanBOT);
        var reason = Language.noReason;
        args.splice(0,1);
        if (args[0]) reason = args.join(" ");
        message.mentions.members.first().ban(message.author.tag + ": " + reason);
        message.channel.send({embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            author: {
                name: message.author.tag + Language.banned + message.mentions.members.first().user.tag,
                icon_url: message.author.displayAvatarURL()
            },
            description: Language.reason + reason,
            footer: {
                text: Language.authorID + message.author.id + Language.mentionID + message.mentions.members.first().id,
                timestamp: message.timestamp
            }
        }});
        message.mentions.members.first().send({embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            author: {
                name: Language.hasBeenBanned + message.guild.name,
                icon_url: message.guild.iconURL
            },
            description: Language.banner + message.author.toString() + Language.reason2 + reason,
            footer: {
                text: Language.authorID + message.author.id + Language.mentionID + message.mentions.members.first().id,
                timestamp: message.timestamp
            }
        }});
}

module.exports.config = {
    name: "ban",
    description: Language.help.ban,
    usage: "r!ban",
    accessableby: "Members",
    category: "⚙️ Moderation",
    aliases: []
}
