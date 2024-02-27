/**@type {import("../bot.js").Command} */
export const data = {
  name: "early",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start Early Access",
  options: [
    {
      type: 3,
      name: "link",
      description: "Link to the session",
      required: true
    }
  ],
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


  /** @type {import("discord.js").APIEmbed[]} */
  const embed = [
    {
      description: `**Early Access**`,
      footer: {
        text: interaction.guild.name,
      },
      color: client.settings.color,
      url: `https://www.google.com/`
    }
  ];

  const hiddenEmbed = [
    {
      description: interaction.options.getString("link", true),
      url: "https://www.google.com/"
    }
  ];



/*
  await interaction.channel?.send({
    embeds: [...embed, ...hiddenEmbed],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 2,
            custom_id: "early_access",
            label: "Join Session"
          }
        ]
      }
    ]
  })
  */
  await interaction.channel?.send({
    content:`**Centreville Early Access:**\n- Private message <@${interaction.user.id}> for the link to the session. Please be reminded that not everyone will be able to join the server. @everyone \n\n__Pre-Release Limit:__ \n6 Law Enforcement \n2 Greenville Fire Department \n4 Platinum Members`
  }); 
  await interaction.deleteReply(); 


}
