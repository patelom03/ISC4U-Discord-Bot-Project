const Discord = require('discord.js')

exports.run = async (bot,message,args) => {
    const rpsEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Rock Paper Scissors')
        .setDescription('Add a reaction to one of the emojis displayed')
        .setTimestamp()
    const msg = await message.channel.send(rpsEmbed)
    await msg.react('🗻')
    await msg.react('📰')
    await msg.react('✂')

    const filter = (reaction, user) => { //only uses author message, others are ignored
        return ['🗻', '📰', '✂'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    const choice = ['🗻', '📰', '✂']
    const botChoice = choice[Math.floor(Math.random() * choice.length)];
     
    msg.awaitReactions(filter, {max: 1, time: 10000, error: ['time']}).then(
        async(collected) => {
            const reaction = collected.first()
            let result = new Discord.MessageEmbed()
            .setTitle('Result')
            .addField('Your choice: ', `${reaction.emoji.name}`)
            .addField('Bot choice: ', `${botChoice}`)
            await msg.edit(result)
            
            if ((botChoice === "🗻" && reaction.emoji.name === "✂") ||
                (botChoice === "📰" && reaction.emoji.name === "🗻") ||
                (botChoice === "✂" && reaction.emoji.name === "📰")) {
                    message.channel.send("You lost!");
            } else if (botChoice === reaction.emoji.name) {
                message.channel.send("It's a tie!");
            } else {
                message.channel.send("You won!");
            }
        }
    )
        .catch(collected => {
            message.channel.send("Time ran out!")
        })
}

exports.help = {
name: 'rps'
}