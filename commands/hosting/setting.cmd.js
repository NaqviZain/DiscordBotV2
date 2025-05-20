/**@type {import("../bot.js").Command} */
export const data = {
  name: "setting",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Setting up",
  dm_permission: false, // ensures that the command cannot be used inside of dms
  default_member_permissions: 0, // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.member.roles.cache.has(client.settings.staff_role))
    return await interaction.editReply({
      content: "You do not have permission to use this command.",
      ephemeral: true,
    });

  const startingChannel = client.channels.cache.get(client.settings.rto_ping);
  const startingEmbed = [
    {
      title: "Session Startup", 
      description: `A session is starting soon. Join RTO and make your department proud!`, 
    }
  ]
  startingChannel.send({ embeds: startingEmbed, content: "<@&1355940151871930368> <@&1355940150999253182> <@&1355940150823092295> <@&1355939359957717050>", allowedMentions: {roles: ["1355940151871930368", "1355940150999253182", "1355940150823092295", "1355939359957717050"]}});
  await interaction.channel?.send({
    content:
      "Setting up! Public Services and Boosters may ping the host in <#1341217220981690378>.",
  });

  await interaction.deleteReply();
}