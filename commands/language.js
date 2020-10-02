/*
------------------------------------------------------------
   Richter BOT v1.0.0 - Server BOT Language Settings
   Developed by LilShieru a.k.a Nico Levianth
   https://github.com/LilShieru
------------------------------------------------------------
*/

var Language = require('/app/Languages/English.json');
const request = require("request");

module.exports.config = {
    name: "language",
    description: "Setting the language of the BOT",
    usage: "r!language eng/vie",
    accessableby: "Members",
    category: "👋 Config"
}

module.exports.run = async (client, message, args) => {
    // If no language was sent, return server's current language
    if (!args[0]) { if (client.config.languages[message.guild.id] || client.config.languages[message.guild.id] == "eng") return message.reply("The server's current BOT language is English."); else if (client.config.languages[message.guild.id] == "vie") return message.reply("Ngôn ngữ hiện tại của BOT trên máy chủ này là Tiếng Việt."); }
    else { if (args[0] != "eng" && args[0] != "vie") return message.reply("Invalid language!\nType *vie* to change the language into Vietnamese or *eng* to change into English!"); }
    // Checking for permissions
    if (!message.member.hasPermission("ADMINISTRATOR")) if (args[0] == "eng") return message.reply("You don't have enough permissions!"); else if (args[0] == "vie") return message.reply("Bạn không có đủ quyền hạn để làm việc này!");
    // Connecting to the server
    if (args[0] == "vie") {
      request('https://hvnfollower.herokuapp.com/Richter_SetLanguage.php?token=HHMuvWqDe5z6bT6zXBZDMcZfajqSHUyG&id=' + message.guild.id + "&lang=" + args[0], function(err, response, body) {
          if (!response || response.statusCode != 200 || body.includes('Connection failed')) {
              message.channel.send("Không thể kết nối tới máy chủ của BOT!");
          } else {
              if (body && body.includes('Success')) {
                  request('http://hvnfollower.herokuapp.com/Richter_GetLanguages.php', function(error, response, body) {
                      if (response && response.statusCode == 200) {
                          // Refreshing the languages list
                          client.config.languages = JSON.parse(body);
                          message.reply("Đã chuyển đổi ngôn ngữ của BOT thành Tiếng Việt.");
                      }
                  });
              } else {
                  message.reply("Có lỗi xảy ra, vui lòng thử lại!");
              }
          }
      });
    }
    else if (args[0] == "eng") {
      request('https://hvnfollower.herokuapp.com/Richter_SetLanguage.php?token=HHMuvWqDe5z6bT6zXBZDMcZfajqSHUyG&id=' + message.guild.id + "&lang=" + args[0], function(err, response, body) {
          if (!response || response.statusCode != 200 || body.includes('Connection failed')) {
              message.channel.send("Unable to connect to the server!");
          } else {
              if (body && body.includes('Success')) {
                  request('http://hvnfollower.herokuapp.com/Richter_GetLanguages.php', function(error, response, body) {
                      if (response && response.statusCode == 200) {
                          // Refreshing the languages list
                          client.config.languages = JSON.parse(body);
                          message.reply("Successfully set the BOT's language into English.");
                      }
                  });
              } else {
                  message.reply("An error has occurred, please try again!");
              }
          }
      });
    }
}
