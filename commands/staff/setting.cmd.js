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

  const startingChannel = client.channels.cache.get("1217291826307010700");
  const startingEmbed = [
    {
      title: "Session Startup", 
      description: `A session is starting soon. Join RTO and make your department proud!`, 
    }
  ]
  startingChannel.send({ embeds: startingEmbed });
  await interaction.channel?.send({
    content:
      "Setting up! Public Services may ping the host in <#1152820015054192700>. Server Boosters may ping the host in <#1211487878538985492> ⁠for early access. Staff may now join.",
  });

  await interaction.deleteReply();
}
