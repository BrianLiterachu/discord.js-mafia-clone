const Discord = require("discord.js");
const fs = require('fs');
const request = require('request');
var Language = require('/app/Languages/English.json');

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.run = async (client, message, args) => {
	if (client.config.languages[message.guild.id] && client.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
    var member = message.author;
        var guildMember = message.member;
        if (message.mentions.users.size) {
            member = message.mentions.users.first();
            guildMember = message.mentions.members.first();
        } else if (!message.mentions.users.size && args[0]) {
            member = client.users.cache.get(args[0]);
            guildMember = message.guild.member(client.users.cache.get(args[0]).id);
        }
        if (member) {
            if (guildMember) {
                var jd = member.createdAt;
                var dateString = jd.getDate() + "/" + (jd.getMonth() + 1) + "/" + jd.getFullYear() + "; " + jd.getHours() + ":" + jd.getMinutes() + ":" + jd.getSeconds() + " (GMT +0)";
                var gjd = guildMember.joinedAt;
                var admin = Language.no;
                if (guildMember.hasPermission("ADMINISTRATOR")) admin = Language.yes;
                var kickMem = Language.no;
                if (guildMember.hasPermission("KICK_MEMBERS")) kickMem = Language.yes;
                var banMem = Language.no;
                if (guildMember.hasPermission("BAN_MEMBERS")) banMem = Language.yes;
                var roleManager = Language.no;
                if (guildMember.hasPermission("MANAGE_ROLES")) roleManager = Language.yes;
                var channelManager = Language.no;
                if (guildMember.hasPermission("MANAGE_CHANNELS")) channelManager = Language.yes;
                var joinDateString = gjd.getDate() + "/" + (gjd.getMonth() + 1) + "/" + gjd.getFullYear() + "; " + gjd.getHours() + ":" + gjd.getMinutes() + ":" + gjd.getSeconds() + " (GMT +0)";
                const infoMessage = {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    author: {
                        name: member.tag + " (" + member.presence.status + ")"
                    },
                    thumbnail: {
                        url: member.avatarURL({
                              format: "jpg",
                              dynamic: true,
                              size: 2048
                            })
                    },
                    fields: [{
                            name: Language.displayName,
                            value: "<@" + member.id + ">",
                            inline: true
                        },
                        {
                            name: Language.memberID,
                            value: member.id,
                            inline: true
                        },
                        {
                            name: "Avatar URL:",
                            value: "[Download](" + member.avatarURL({
                              format: "jpg",
                              dynamic: true,
                              size: 2048
                            }) + ")",
                            inline: true
                        },
                        {
                            name: Language.createdDate,
                            value: dateString,
                            inline: false
                        },
                        {
                            name: Language.joinedDate,
                            value: joinDateString,
                            inline: false
                        },
                        {
                            name: Language.rolesCount,
                            value: guildMember.roles.cache.filter(
                                role => role.name !== ""
                            ).size - 1,
                            inline: true
                        },
                        {
                            name: Language.highestRole,
                            value: guildMember.roles.highest.toString(),
                            inline: true
                        },
                        {
                            name: Language.hexColor,
                            value: guildMember.displayHexColor,
                            inline: false
                        },
                        {
                            name: "\u200b",
                            value: "\u200b",
                            inline: false
                        },
                        {
                            name: Language.isAdmin,
                            value: admin,
                            inline: true
                        },
                        {
                            name: Language.canKickMem,
                            value: kickMem,
                            inline: true
                        },
                        {
                            name: Language.canBanMem,
                            value: banMem,
                            inline: true
                        },
                        {
                            name: Language.canManageRoles,
                            value: roleManager,
                            inline: true
                        },
                        {
                            name: Language.canManageChannels,
                            value: channelManager,
                            inline: true
                        },
                    ]
                };
                message.channel.send({
                    embed: infoMessage
                });
            } else {
                var jd = member.createdAt;
                var dateString = jd.getDate() + "/" + (jd.getMonth() + 1) + "/" + jd.getFullYear() + "; " + jd.getHours() + ":" + jd.getMinutes() + ":" + jd.getSeconds() + " (GMT +0)";
                const infoMessage = {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    author: {
                        name: member.tag + " (" + member.presence.status + ")"
                    },
                    thumbnail: {
                        url: member.displayAvatarURL
                    },
                    fields: [{
                            name: Language.displayName,
                            value: "<@" + member.id + ">",
                            inline: true
                        },
                        {
                            name: Language.memberID,
                            value: member.id,
                            inline: true
                        },
                        {
                            name: "Avatar URL:",
                            value: "[Download](" + member.avatarURL({
                              format: "jpg",
                              dynamic: true,
                              size: 2048
                            }) + ")",
                            inline: true
                        },
                        {
                            name: Language.createdDate,
                            value: dateString,
                            inline: false
                        },
                        {
                            name: Language.memberLeft,
                            value: "\u200b",
                            inline: false
                        },
                    ]
                };
                message.channel.send({
                    embed: infoMessage
                });
            }
        } else {
            message.reply(Language.invalidUser);
        }
}

module.exports.config = {
    name: "whois",
    description: Language.help.whois,
    usage: "r!whois <mention/ID>",
    accessableby: "Members",
	category: "🙋 Member information",
    aliases: []
}
