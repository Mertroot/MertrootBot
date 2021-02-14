const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const AsciiTable = require('ascii-table');
const prefix = config.prefix
const fs = require("fs");
const qdb = require("quick.db");
require('./util/eventHandler.js')(client);



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

var commandtable = new AsciiTable('Believe Command Table');
commandtable.setHeading("Command", 'Status', "Aliases")
fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutcuklar = require(`./commands/${dir}/${file}`);
  if (komutcuklar.help.name) {
  client.commands.set(komutcuklar.help.name, komutcuklar);
  commandtable.addRow(komutcuklar.help.name, "✔️", komutcuklar.conf.aliases)
} else {
  commandtable.addRow(komutcuklar.help.name, "❌")
  continue;
    }
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
  }
})
console.log(commandtable.toString())


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};


client.on ('ready', () => {
    console.log('Ben Geldim')
    })


    client.on('message', msg  => {
        if(msg.content === prefix+'ping')
        msg.reply(`**Pingim ${client.ws.ping}**`);
    })

    client.on('message', msg  => {
      if(msg.content === prefix+'tag')
      msg.channel.send(`**"Mystery" veya "0309" Kullanabilirsiniz.**"`);
  })

  client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
    const tag = 'Mystery'
    const sunucu = '787580351014240296'
    const kanal = '794211681114783745'
    const rol = '791640276207665172'
  
    try {
  
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
    }
    if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
    }
  } catch (e) {
  console.log(`Bir hata oluştu! ${e}`)
   }
  }
  });


  //------------------------KANAL KORUMA-----------------------------\\

client.on("channelDelete", async channel => {
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id === client.user.id) return;
//  if (entry.executor.id === channel.guild.owner.id) return
  if(config.korumakanal) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bir Kanal Silindi!");
    embed.addField("Kanalı Silen", "> `" + entry.executor.tag + "`");
    embed.addField("Kanalı Silen İD", "> `" + entry.executor.id + "`");
    embed.addField("Silinen Kanal", "> `" + channel.name + "`");
    embed.addField("Sonuç;", "Kanal Tekrar Açıldı");
    embed.setThumbnail(entry.executor.avatarURL());
    embed.setFooter(channel.guild.name, channel.guild.iconURL());
    embed.setColor("RED");
    embed.setTimestamp();
    client.channels.cache
      .get(config.korumakanal)
      .send(embed)
      .then(channel.clone().then(x => x.setPosition(channel.position)));
  }
});

//---------------------------ROL KORUMA------------------------------\\

client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id === client.user.id) return;
 // if (entry.executor.id === role.guild.owner.id) return
  if (config.korumakanal) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bir Rol Silindi!");
    embed.addField("Rolü Silen", "> `" + entry.executor.tag + "`");
    embed.addField("Rolü Silen İD", "> `" + entry.executor.id + "`");
    embed.addField("Silinen Rol", "> `" + role.name + "`");
    embed.addField("Sonuç;", "Rol Tekrar Açıldı");
    embed.setThumbnail(entry.executor.avatarURL());
    embed.setFooter(role.guild.name, role.guild.iconURL());
    embed.setColor("RED");
    embed.setTimestamp();
    client.channels.cache
      .get(config.korumakanal)
      .send(embed)
      .then(
        role.guild.roles.create({
          data: {
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          },
          reason: "Silinen Rol Açıldı."
        })
      );
  }
});


    client.login(config.token);