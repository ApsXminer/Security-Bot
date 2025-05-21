module.exports = async (client) => {
  client.on("ready", async () => {
    console.log(`Code X | ${client.user.tag} Has Logged In!\nCode X | Emoji Server: https://discord.gg/44Yj6UyNBr\nCode X | Subscribe to Team Code X.`)
    client.user.setPresence({
      activities: [{
        name: `${client.config.prefix}help`,
        type: "STREAMING",
        url: "https://www.discord.gg/teamCode X",
      }],
      status: "online"
    });
  });
};
