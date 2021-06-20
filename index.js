const Discord = require('discord.js') //imports discord.js library 
const bot = new Discord.Client();
const fs = require('fs')
var status = Boolean(!status); 
bot.commands = new Discord.Collection();

//turn on bot
bot.on('ready', () => {
    console.log('Bot online') 
    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err)
        let jsfile = files.filter(f => f.split('.').pop() == 'js') //removes .js from command file names  

        if(jsfile.length == 0) {
            return console.log("Could not find any commands!")
        } 
          
        //checks for command inputed by user in command folder 
        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    }) 
}) 

//isolates commands after # and then checkes command folder for commands
bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;

    let prefix = '#';
    let MessageArray = message.content.split(' '); //splits sentences into indiviudal words
    let cmd = MessageArray[0].slice(prefix.length) //stores cmd and removes prefix
    let args = MessageArray.slice(1) //removes cmd and stores rest into array

    if(!message.content.startsWith(prefix)) return; 

    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}
})

//deleted-messages logger 
bot.on('messageDelete', async message => {
    let loggingEmbed = new Discord.MessageEmbed()
    .setTitle('Deleted Message!')
    .setColor('RANDOM')
    .setThumbnail(message.avatarURL)
    .addField('Message: ', message.content)
    .addField('Deleted by: ', message.author.tag)
    .addField('Deleted in: ', message.channel)
    .addField('Deleted at: ', message.createdAt)
    
    //check guild channels for specific one
    let logChannel = message.guild.channels.cache.find(c => c.name === "deleted-messages");
    if(!logChannel) return; 
    
    logChannel.send(loggingEmbed); //sends loggingEmbed to deleted-message channel
})

//roast method
var makeSad = ["coward", 
"leave", 
"be gone", 
"disappear"] 
var forbbiddenWords = ["stupid"]

bot.on('message', message => {
    if(message.member.id == '494966755278716928' && message.content == '#kill') {
        status = !status;
        if(status) {
            message.channel.send('Instant kill activated!')
        }if(!status) {
            message.channel.send('Instant kill turned off!')
        }
    }
    if(status && message.member.id == '219841165019578368') {
        if(message.content == '#bye' || message.content == '#hello') return;
        const randomArr = makeSad[Math.floor(Math.random() * makeSad.length)]; 
        message.channel.send(`${randomArr}`)
    }
    if(status && message.member.id == '791391640697831444') {
        for(var i = 0; i < forbbiddenWords.length; i++) //checks message for forbiddenWords 
        if(message.content.includes(forbbiddenWords[i])) {
            message.delete(); //removes message if it contains forbiddenWords
        }
    }
})

bot.login("ODMyNzY2ODE3MjQ3OTUyOTI4.YHokiQ.RtTHOCl4Yo8VRjEm7qbwoHdkrok")