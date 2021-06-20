const { tictactoe } = require('reconlx') //get npm reconlx for game tic tac toe

exports.run = async (bot,message,args) => {
    const member = message.mentions.members.first() 
        if(!member)  return  message.channel.send('Please specify a member')
        new tictactoe({
            player_two: member, //player 2
            message: message //executes npm reconlx package 
    })
}

exports.help = {
    name: 'ttt'
    }