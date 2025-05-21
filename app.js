const { Client, Collection, MessageEmbed, WebhookClient, ShardingManager } = require("discord.js");
const { mongoURL, token, webhook_error } = require("./config.json");
const { Database } = require("quickmongo");
const ascii = require("ascii-table");
const Commandtable = new ascii().setHeading("Code X", "Commands", "Status");
const EventsTable = new ascii().setHeading("Code X", "Events", "Status");
const { readdirSync } = require("fs");
const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INVITES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_BANS", "GUILD_WEBHOOKS", "GUILD_PRESENCES", "MESSAGE_CONTENT"],
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  allowedMentions: {
    repliedUser: true,
    parse: ["everyone", "roles", "users"]
  }
});
module.exports = client;
client.commands = new Collection();
client.cools = new Collection();
client.data = new Database(mongoURL);
//logschannel,roles,idsetc
client.data2 = new Database(mongoURL);
//antinuke,server toggling
client.data3 = new Database(mongoURL);
//whitelist data
client.data.connect();
client.data2.connect();
client.data3.connect();
client.config = require(`./config.json`);
client.emoji = require(`./emojis.json`);


readdirSync(`./commands/`).forEach(d => {
  const c = readdirSync(`./commands/${d}`).filter(f => f.endsWith('.js'));
  for (const f of c) {
    const cmd = require(`./commands/${d}/${f}`);
    client.commands.set(cmd.name, cmd)
    Commandtable.addRow("Code X", cmd.name, "✅");
  }
});
console.log(Commandtable.toString());

readdirSync("./events/").forEach(e => {
  require(`./events/${e}`)(client);
  let eve = e.split(".")[0];
  EventsTable.addRow("Code X", eve, "✅");
});
console.log(EventsTable.toString());

client.login(client.config.token);
const web = new WebhookClient({ url: webhook_error })
process.on("unhandledRejection", (err) => {
  console.error(err)
  web.send({ embeds: [new MessageEmbed().setColor(`#2f3136`).setDescription(`\`\`\`js\n${err}\`\`\``)] })
});
process.on("uncaughtException", (er) => {
  console.error(er)
  web.send({ embeds: [new MessageEmbed().setColor(`#2f3136`).setDescription(`\`\`\`js\n${er}\`\`\``)] })
})

require("http").createServer((_, r) => r.end("Code X | Bot is online!")).listen(8080)
