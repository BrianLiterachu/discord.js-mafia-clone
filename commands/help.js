const Discord = require("discord.js");
const fs = require('fs');
var Language = require('/app/Languages/English.json');

module.exports.run = async (bot, message, args) => {
		if (bot.config.languages[message.guild.id] && bot.config.languages[message.guild.id] == "vie") Language = require('/app/Languages/Vietnamese_backup.json');
		var data = [], categories = [];
		const { commands } = bot;

		if (!args.length) {
			commands.forEach(command => {
				if (command.config.category) {
					var exist = false;
					for (i = 0; i < categories.length; i++) if (categories[i] == command.config.category) exist = true;
					if (!exist) categories.push(command.config.category);
				}
			});
			var fields = [];
				fields.push({
					name: Language.help.developers,
					value: "<@536899471720841228>, <@639341782487924746>, <@527652357354422272>",
					inline: false
				});
				fields.push({
					name: Language.help.botInformation,
					value: "[" + Language.help.inviteLink + "](https://bit.ly/39KhB8z)\n[" + Language.help.supportServer + "](https://discord.gg/snHUT3S)",
					inline: false
				});
			for (i = 0; i < categories.length; i++) {
				var commandList = [];
				commands.forEach(command => {
					if (command.config.category && categories[i] == command.config.category) {
						commandList.push(command.config.name);
					}
				});
				fields.push({
					name: categories[i],
					value: commandList.join("\n"),
					inline: true
				});
			}
			var embed = {
                                    color: 0x0099ff,
                                    title: Language.help.listCommands,
                                    author: {
                                        name: bot.user.tag,
                                        icon_url: bot.user.displayAvatarURL(),
                                    },
                                    description: Language.help.moreInfo,
                                    thumbnail: {
                                        url: bot.user.displayAvatarURL(),
                                    },
                                    fields: fields,
                                    timestamp: new Date()
                                };

			message.channel.send({embed: embed});
			return;
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply(Language.help.invalidCommand);
		}

		if (command.config.aliases && command.config.aliases.length) data.push(`**Tên khác:** ${command.config.aliases.join(', ')}`);
		if (command.config.description) data.push(`**Mô tả:** ${command.config.description}`);
		if (command.config.usage) data.push(`**Cách sử dụng:** \`${command.config.usage}\``);
	
		var embed = new Discord.MessageEmbed()
			    .setAuthor(`${command.config.name}`)
			    .setDescription(data)
			    .setColor('#00FFF3')

		message.channel.send(embed);
}

module.exports.config = {
    name: "help",
    description: Language.help.help,
    usage: "r!help",
    accessableby: "Members",
    aliases: []
}
