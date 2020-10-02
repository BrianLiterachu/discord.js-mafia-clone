const Discord = require("discord.js");
const fs = require('fs');
const { inspect } = require('util');

module.exports.run = async (bot, message, args) => {
    if (message.author.id == '536899471720841228') {
        let evaled;
        try {
          evaled = await eval(args.join(' '));
        }
        catch (error) {
          console.error(error);
          message.reply('there was an error during evaluation.');
        }
    }
    else {
        message.reply("Gì em");
    }
}

module.exports.config = {
    name: "eval",
    description: "Evaluate a command (Developer Only)",
    usage: "r!eval",
    accessableby: "Owners",
    aliases: []
}
