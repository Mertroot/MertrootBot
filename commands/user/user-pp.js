
const Discord = require('discord.js');

exports.run = (client, message, args) => {
 
var embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`${message.author.tag} adlı kullanıcının Profil Fotosu`)
.setAuthor(message.author.name,message.author.avatarURL())
.setDescription(`${message.author.tag} isimli kullanıcı profil fotonu İstedi`)
.setThumbnail(message.author.avatarURL({size: 1024, dynamic: true, Format: 'png'}))
.setImage(message.author.avatarURL({size: 1024, dynamic: true, Format: 'png'}))
message.channel.send(embed)


};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pp',
  description: 'Botun Pingini Gösterir !',
  usage: 'ping'
};
