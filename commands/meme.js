const fetch = require('node-fetch')
const Discord = require('discord.js')
const link = 'https://www.reddit.com/r/dankmemes.json?sort=top&t=week'


exports.run = async (bot,message,args) => {
    let fetchMemes = await fetch(link).then(m => m.json()) //changes format so bot can read easier
    const getMeme = fetchMemes.data.children;
    let randomMeme = getMeme[Math.floor(Math.random() * getMeme.length)]
    let memeEmbed = new Discord.MessageEmbed() //take random meme and turn it into an embed
    .setTitle(randomMeme.data.title)
    .setImage(randomMeme.data.url)
    .setColor("RANDOM")

    message.channel.send(memeEmbed)

}

exports.help = {
name: 'meme'
}