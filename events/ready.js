const client = global.client;

module.exports = async () => {
  client.guilds.cache.forEach(async (guild) => {
    const invites = await guild.fetchInvites();
    client.invites.set(guild.id, invites);
  });
  client.user.setActivity("Rolex ❤️ Tormund");
  console.log(client.user.tag)
      let botVoiceChannel = client.channels.cache.get("911391152371011614");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
};

module.exports.conf = {
  name: "ready",
};
