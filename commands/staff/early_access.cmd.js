/**@type {import("../bot.js").Command} */
export const data = {
  name: "early",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start Early Access",
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


  await interaction.channel?.send({
    content:`**Centreville Early Access:**\n- Private message <@${interaction.user.id}> for the link to the session. Please be reminded that not everyone will be able to join the server. @everyone \n\n__Pre-Release Limit:__ \n6 Law Enforcement \n2 Greenville Fire Department \n4 Platinum Members`
  })
  await interaction.deleteReply();
}
