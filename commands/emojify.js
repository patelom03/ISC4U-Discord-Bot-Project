const { emojify } = require('discord-texts')

exports.run = async (bot,message,args) => {
    var text = args.join(" ")
    message.channel.send(emojify(text))
    message.delete();
}

exports.help = {
name: 'emojify'
}