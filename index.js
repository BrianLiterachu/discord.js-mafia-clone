const fs = require('fs');
const request = require("request");

const Discord = require('discord.js');
const client = new Discord.Client();

const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkzNDE1MTYwODc5NTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5OTkxNjMwfQ.y7zUaJIYacx1MEhJn2crIIg45ZvG7w2fR47slZFbNLU', client);

const config = require('./config.json');
client.config = config;

client.config.customPrefixes = [];
client.config.languages = [];

request('http://hvnfollower.herokuapp.com/Richter_GetCustomPrefixes.php', function(error, response, body) {
    if (response && response.statusCode == 200 && !body.includes("Connection failed")) {
        // Refreshing the prefixes list
        client.config.customPrefixes = JSON.parse(body);
    }
});

request('http://hvnfollower.herokuapp.com/Richter_GetLanguages.php', function(error, response, body) {
    if (response && response.statusCode == 200 && !body.includes("Connection failed")) {
        // Refreshing the languages list
        client.config.languages = JSON.parse(body);
    }
});

// Requires all database-related functions
require("./utils/settings")(client);
require("./utils/mongodb")(client);

// Inits the connection
client.initDB(client.config.db);

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`👌 Command loaded: ${commandName}`);
    });
});

// Login
client.login(process.env.token);
