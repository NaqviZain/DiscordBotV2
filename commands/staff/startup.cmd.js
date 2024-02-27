import { Message } from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "session",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start a session",
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
  const user = interaction.member;

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: "Centreville Session Startup!",
      description: `<@${interaction.member.id}> is hosting a session! 10+ reactions are required for this session to commence.`,
      color: 0xffffff,
    },
  ];



  let sending = await interaction.channel?.send({
    content: "@here <@&1211464822370082846>",
    embeds: response,
    allowedMentions: { parse: ["here"] ["roles"] },
  });
  await sending.react("✅");
  await interaction.deleteReply();
  
}
