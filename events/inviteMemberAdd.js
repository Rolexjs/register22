const client = global.client;
const { Collection } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const { İnvite, Guild } = require("../configs/config.json");
const moment = require("moment");
moment.locale("tr");
module.exports = async (member) => {
  const channel = member.guild.channels.cache.get(İnvite.Log);

 
  if (member.user.bot) return;
  const guild = client.guilds.cache.get(Guild.GuildID);
  const gi = client.invites.get(member.guild.id).clone() || new Collection().clone();
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  client.invites.set(member.guild.id, invites);

  if (guild.vanityURLCode) {
    await guild.fetchVanityData().then(async (res) => {
   
  if (invite === member.guild.vanityURLCode) channel.send(`<:9h_moon1:911412339469860924> ${member} katıldı! **Davet eden:** (${member.guild.name}:\` ${res.uses}\` kullanım.)`);

})}
  if (!invite.inviter) return;
  await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    channel.send(`<:9h_moon1:911412339469860924> ${member} sunucumuza katıldı. ${invite.inviter.tag} tarafından davet edildi. (**${total}** davet)`);
  } else {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    channel.send(`<:9h_moon1:911412339469860924> ${member} sunucumuza katıldı. ${invite.inviter.tag} tarafından davet edildi. (**${total}** davet)`);
  }
};

module.exports.conf = {
  name: "guildMemberAdd",
};
