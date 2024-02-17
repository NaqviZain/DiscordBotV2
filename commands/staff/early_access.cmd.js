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
  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      description: `**Early Access**\n\n`,
      color: client.settings.color,
      url: "https://www.google.com/search?q=hello+world",
    },
  ];

  /**@type {import("discord.js").APIEmbed[]} */
  const hidden = [
    {
      description: eaLink,
      url: "https://www.google.com/search?q=hello+world",
    },
  ];

  /**@type {import("discord.js").APIActionRowComponent[]} */
  const r = [
    {
      type: 1,
      /**@type {import("discord.js").APIButtonComponent[]} */
      components: [
        { label: "Early Access", type: 2, style: 1, custom_id:"early_access"},
      ],
    },
  ];

  await interaction.channel?.send({
    content:`**Centreville Early Access:**\n- Private message <@${interaction.user.id}> for the link to the session. Please be reminded that not everyone will be able to join the server. @everyone \n\n__Pre-Release Limit:__ \n6 Law Enforcement \n2 Greenville Fire Department \n4 Platinum Members`
  })
  await interaction.deleteReply();
}
