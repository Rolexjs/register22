const client = global.client;
const { Collection } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const { Register, Guild, Emoji } = require("../configs/config.json");
const moment = require("moment");
moment.locale("tr");
module.exports = async (member) => {
     console.log("1")
     const channel2 = member.guild.channels.cache.get(Register.WelcomeChannel);
     const yenihesap = member.guild.channels.cache.get(Register.NewAccountLog);
     console.log("2")
  if (member.user.bot) return;
  console.log("3")
  const guild = client.guilds.cache.get(Guild.GuildID);
  const gi = client.invites.get(member.guild.id).clone() || new Collection().clone();
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  client.invites.set(member.guild.id, invites);
  console.log("4")
  
      if (guild.vanityURLCode) {
          await guild.fetchVanityData().then(async (res) => {
                    
               if (invite === member.guild.vanityURLCode) channel2.wsend(`
${Emoji.Welcome1} ${Guild.KüçükSunucuİsim} Sunucusuna Hoşgeldin ${member}\n
${Emoji.Welcome2} Seninle Birlikte Sunucuda ${member.guild.memberCount} Kişi Olduk\n
${Emoji.Welcome3} Sunucuya Davet Eden ${guild.name} Toplam Daveti ${res.uses}\n
<@&${Register.Role}> Rolüne sahip yetkililer sizin ile ilgilenecek.`)
      member.roles.set(Register.Unregister)
      })}

     
     console.log("6")
     if (!invite.inviter) return;
  await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
     const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
     const total = inviterData ? inviterData.total : 0;
     const fake = inviterData ? inviterData.fake : 0;
     const regular = inviterData ? inviterData.regular : 0;
const embed = new MessageEmbed()
.setDescription(`${member} \`(${member.id})\`
Sunucuya Katıldı Fakat  \`${moment(member.user.createdAt).format("LLL")}\` (${client.tarih(member.user.createdAt)}) tarihinde açıldığı için Şüpheli Olarak Ayarlandı\n
\`•\` Davet Eden Kullanıcı => **${invite.inviter}**
\`•\` Toplam Davet Sayısı => **${total}**
\`•\` Fake Davet Sayısı => **${fake}**
\`•\` Gerçek Davet Sayısı => **${regular}**
`)
.setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
       .setColor('#460707')
       .setThumbnail(member.guild.iconURL({ dynamic: true }))
       yenihesap.send(embed)
       channel2.send(`${member.toString()} Sunucuya Katıldı Fakat  \`${moment(member.user.createdAt).format("LLL")}\` (${client.tarih(member.user.createdAt)}) tarihinde açıldığı için Şüpheli Olarak Ayarlandı `)
     member.roles.set(Register.ŞüpheliRol)
     } else {
     const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
     const total = inviterData ? inviterData.total : 1;
     channel2.wsend(`
${Emoji.Welcome1} ${Guild.KüçükSunucuİsim} Sunucusuna Hoşgeldin ${member}\n
${Emoji.Welcome2} Seninle Birlikte Sunucuda ${member.guild.memberCount} Kişi Olduk\n
${Emoji.Welcome3} Sunucuya Davet Eden **${invite.inviter.tag}** Toplam Daveti ${total}\n
<@&${Register.Role}> Rolüne sahip yetkililer sizin ile ilgilenecek.       
              `)
              member.roles.add(Register.Unregister)

  }
    
}
module.exports.conf = {
     name: "guildMemberAdd",
   };