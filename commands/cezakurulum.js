const inviteMemberSchema = require("../schemas/inviteMember");
const moment = require("moment");
moment.locale("tr");
const { Database } = require("ark.db")
const kanaldb = new Database('../configs/CezaKurulum.json')
module.exports = {
  conf: {
    aliases: ["log"],
    name: "logs"
  },

  run: async (client, message, args, embed) => {
    const kanallar = require("../configs/config.json")
     const mod = await message.guild.channels.create("Loglar", {
          type: "category",
          
          
      });
     
     
          const emoji = await message.guild.channels.create('mute-log', { parent: mod,
            
              permissionOverwrites: [
                  {
                      id: message.guild.roles.everyone,
                      deny: ["VIEW_CHANNEL"]
                  }]})
          await kanaldb.set("mute-log", emoji.id);
         
          const ban = await message.guild.channels.create('ban-log', { parent: mod,
            
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }]})
        await kanaldb.set("ban-log", ban.id);
         
        const jail = await message.guild.channels.create('jail-log', { parent: mod,
            
          permissionOverwrites: [
              {
                  id: message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }]})
      await kanaldb.set("jail-log", jail.id);
      const vmute = await message.guild.channels.create('vmute-log', { parent: mod,
            
        permissionOverwrites: [
            {
                id: message.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
            }]})
    await kanaldb.set("vmute-log", vmute.id);
        
  },
};