const fetch = require('node-fetch')
const Discord = require('discord.js')
const link = 'https://www.reddit.com/r/EarthPorn.json?sort=top&t=week'


exports.run = async (bot,message,args) => {
    let fetchNature = await fetch(link).then(m => m.json()) //changes format so bot can read easier
    const getNature = fetchNature.data.children;
    let randomMeme = getNature[Math.floor(Math.random() * getNature.length)]
    let natureEmbed = new Discord.MessageEmbed() //take random nature picture and turn it into an embed
    .setTitle(randomMeme.data.title)
    .setImage(randomMeme.data.url)
    .setColor("RANDOM")

    message.channel.send(natureEmbed)

}

exports.help = {
name: 'nature'
}