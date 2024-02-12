/**@type {import("../bot.js").Command} */

import Profile from "../schemas/profile_schema.js";

export const data = {
  name: "hosting-instructions",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Instructions on hosting",
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

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: `Hosting Instructions`,
      description: `
      \n
      > **1.** Go to <#1099918153531785294> or <#1153783944697872464>\n
      > **2.** Use the /startup command and enter the amount of reactions\n
      > **3.** After getting enough reactions, use the /setting command.\n
      > **4.** Go to the early-access channel and use /early. Along with "All may DM"\n
      > **5.** Wait a couple minutes, then use /invited.\n
      > **6.** Go to the server channel and use /release\n
      > **7.** Every 10-30 minutes use /reinvites
      
      `,
      color: client.settings.color,
    }]
  await interaction.editReply({ embeds: response });
    
}
