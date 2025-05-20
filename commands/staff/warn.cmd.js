import { modlog } from "../../data/mongodb.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "warn",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "infract a civilian",
  options: [
    {
      name: "user",
      description: "What member ",
      required: true,
      type: 6,
    },
    {
      name: "reason",
      description: "What is the reason for the infraction",
      required: true,
      type: 3,
    },
    {
      name: "evidence",
      description: "What is the evidence for the infraction",
      required: true,
      type: 3,
    },
    {
      name: "type",
      description: "What type of infraction is this",
      required: true,
      type: 3,
      choices: [
        {name: "Discord", value: "Discord"},
        {name: "Ingame", value: "Ingame"},
      ]
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
  var user = interaction.options.get("user").user;  
  const reason = interaction.options.getString("reason");
  const evidence = interaction.options.getString("evidence");
  const count = await modlog.countDocuments({});
  
  if(!interaction.member.roles.cache.has(client.settings.staff_role)) return await interaction.editReply({ content: "You do not have permission to use this command. If you are a staff member this means you do not have the ``Staff Team`` role", ephemeral: true });

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      description: `You were warned in Centreville for **${reason}**\n\n> Evidence: ${evidence}`,
      color: client.settings.color,
    },
  ];

  /**@type {import("discord.js").APIEmbed[]} */
  const resp = [
    {
      title: "Member warned",
      description: `\n${user} has been infracted\n> Reason: ${reason}\n> Evidence: ${evidence} `,
      color: client.settings.color,
      footer: {
        text: `Moderator: ${interaction.user.username}`,
        icon_url: interaction.user.displayAvatarURL(),
      },
    },
  ];

  const modlog_save = new modlog({
    recipient: user.id,
    moderator: interaction.user.id,
    type: interaction.options.get("type").value,
    reason: reason,
    evidence: evidence,
    case: count + 1,
  })
  await modlog_save.save();

  await interaction.editReply({
    embeds: resp,
    ephemeral: true,
  })
  try {
    await user.send({
      embeds: response,
    });
  } catch (e) {
    console.log("Could not send DM to user");
  }

  const log_channel = await client.channels.fetch(client.settings.log_channel);
  if (log_channel) {
    await log_channel.send({
      embeds: resp,
    });
  } else {
    console.log("Log channel not found");
  }
}