var roast = [", please go away", 
", no one likes you", 
" is a monkey",
", just leave at this point"] 

exports.run = async (bot,message,args) => {
    const randomRoast = roast[Math.floor(Math.random() * roast.length)]; 
    const taggedUser = message.mentions.members.first();
    message.channel.send(`${taggedUser} ${randomRoast}`).then((msg) => {
        message.delete(); 
    });
}

exports.help = {
name: 'roast'
}