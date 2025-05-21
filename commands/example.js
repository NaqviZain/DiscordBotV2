/**@type {import("../bot.js").Command} */
export const data = {
  name: "",
  type: 1, // 1 is reg cmd, 2 is msg app, 3 is user app
  description: "",
  options: [
    {
      type: 3, // STRING Type
      name: "query",
      description: "search ",
      required: false,
      choices: [{ name: "", value: "" }],
      autocomplete: false,
    },
  ],
  dm_permission: false, 
  default_member_permissions: 0, 
};
/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  await interaction.deferReply({ ephemeral: true }); 
  const query = interaction.options.getString("query"); 

  /**@type {import("discord.js").APIEmbed[]} */ 
  const e = [
    {
      title: "Hello World",
      description: "hello world description", 
      color: client.settings.color,
    },
  ];
  await interaction.reply({ embeds: e, content: "hello" });


  await interaction.editReply({ embeds: e }); 
}
