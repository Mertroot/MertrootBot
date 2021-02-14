const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')

module.exports = client => {

console.log("Bot Hazır");

var randomMesajlar = [

    "Mert💗Melis",
    "Yıkılmam Asla !!"
]




setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);

}, 8000);


client.user.setStatus("idle");
/*
idle yerine yazılabilecekler
dnd 
idle
online
ofline
*/


}