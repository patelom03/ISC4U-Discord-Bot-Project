const { DiscordAPIError } = require("discord.js");

exports.run = async (bot,message,args) => {
    let member = message.mentions.members.first();
    message.channel.send(`
**These are my supported commands!**

**#hello** -> Greet the bot
**#bye** -> Goodbye
**#meme** -> Random Dank Meme
**#nature** -> Scenic Earth Pictures 
**#roast @user** -> Roast mentioned user 
**#rps @user** -> Play rock, paper, scissors with someone
**#ttt @user** -> Play tic tac toe with another player
**#emojify 'text'** -> Turn text into emoji letters
`)}

exports.help = {
name: 'help'
}