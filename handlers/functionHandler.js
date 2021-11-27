const { TextChannel } = require("discord.js")
module.exports = function (client) {
     TextChannel.prototype.wsend = async function (message) {
          const hooks = await this.fetchWebhooks();
          let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
          if (webhook) return webhook.send(message);
          webhook = await this.createWebhook(client.user.username, { avatar: client.user.avatarURL() });
          return webhook.send(message);
        };
}