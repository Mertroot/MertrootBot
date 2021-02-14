const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
module.exports.run = async (client, message, args) => {

if(!["YETKILI ROL ID"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

let guild = "SUNUCU ID"; // SUNUCU ID
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
var msg = message;
var üyesayısı = msg.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {
üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
return {
'0': ``,
'1': ``,
'2': ``,
'3': ``,
'4': ``,                       
'5': ``,
'6': ``,
'7': ``,
'8': ``,
'9': ``}[d];})}
  
  
var sessayı = count.toString().replace(/ /g, "    ")
var üs2 = sessayı.match(/([0-9])/g)
sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs2) {
sessayı = sessayı.replace(/([0-9])/g, d => {
return {
'0': ``,
'1': ``,
'2': ``,
'3': ``,
'4': ``,                       
'5': ``,
'6': ``,
'7': ``,
'8': ``,
'9': ``}[d];})}

var taglılar = 0;
let tag = "TAG";
message.guild.members.cache.forEach(member => {
if(member.user.username.includes(tag)) {
taglılar = taglılar+1}})

var taglılar = taglılar.toString().replace(/ /g, "    ")
var üs3 = taglılar.match(/([0-9])/g)
taglılar = taglılar.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs3) {
taglılar = taglılar.replace(/([0-9])/g, d => {
return {
  '0': `<a:0_:800375913627516979>`,
  '1': `<a:1_:800375940831641670>`,
  '2': `<a:2_:800375978193846273>`,
  '3': `<a:3_:800376009752182795>`,
  '4': `<a:4_:800376030563926016>`,                       
  '5': `<a:5_:800376055957159936>`,
  '6': `<a:6_:800376096523943987>`,
  '7': `<a:7_:800376118095904848>`,
  '8': `<a:8_:800376137473327124>`,
  '9': `<a:9_:800376157874028544>`}[d];})}

  
  
  
var cevirimici = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
var üs4= cevirimici.match(/([0-9])/g)
cevirimici = cevirimici.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs4) {
cevirimici = cevirimici.replace(/([0-9])/g, d => {
return {
  '0': `<a:0_:800375913627516979>`,
  '1': `<a:1_:800375940831641670>`,
  '2': `<a:2_:800375978193846273>`,
  '3': `<a:3_:800376009752182795>`,
  '4': `<a:4_:800376030563926016>`,                       
  '5': `<a:5_:800376055957159936>`,
  '6': `<a:6_:800376096523943987>`,
  '7': `<a:7_:800376118095904848>`,
  '8': `<a:8_:800376137473327124>`,
  '9': `<a:9_:800376157874028544>`}[d];})}

  
  
  
var booster = message.guild.roles.cache.get("787580655504064513").members.size
var booster = booster.toString().replace(/ /g, "    ")
var üs5 = booster.match(/([0-9])/g)
booster = booster.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs5) {
booster = booster.replace(/([0-9])/g, d => {
return {
'0': ``,
'1': ``,
'2': ``,
'3': ``,
'4': ``,                       
'5': ``,
'6': ``,
'7': ``,
'8': ``,
'9': ``}[d];})}


  
const embed1 = new Discord.MessageEmbed()
.setColor('0x0088ff')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 .setDescription(`
**Sunucuda Toplam** ${üyesayısı} **Üye bulunmakta.** 
**Sunucuda Toplam** ${cevirimici} **Üye Çevrimiçi.** 
**Ses Kanallarında** ${sessayı} **Üye Sohbet Ediyor.**
**Tagımızda Toplam ** ${taglılar} **Üye Bulunmakta.**
**Sunucuda Toplam ${booster} Booster Üye Bulunmakta.**`)

msg.channel.send(embed1);
  
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','say','info'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}