import { modlog } from "../../data/mongodb.js";
import ms from "ms";






/**@type {import("../bot.js").Command} */
export const data = {
  name: "mute",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "mute a civilian",
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
      name: "duration",
      description: "How long should the mute last? (e.g. 10m, 1h, 2d)",
      required: true,
      type: 3,
    },
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
  var member = interaction.guild.members.cache.get(user.id);
  const reason = interaction.options.getString("reason");
  const evidence = interaction.options.getString("evidence");
  const count = await modlog.countDocuments({});
  
  if(!interaction.member.roles.cache.has(client.settings.staff_role)) return await interaction.editReply({ content: "You do not have permission to use this command. If you are a staff member this means you do not have the ``Staff Team`` role", ephemeral: true });

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      description: `You were muted in Centreville for **${reason}**\n\n> Evidence: ${evidence}\n> Duration: ${interaction.options.getString("duration")}`,
      color: client.settings.color,
    },
  ];

  /**@type {import("discord.js").APIEmbed[]} */
  const resp = [
    {
      title: "Member muted",
      description: `\n${user} has been muted\n> Reason: ${reason}\n> Evidence: ${evidence}\n> Duration: ${interaction.options.getString("duration")}`,
      color: client.settings.color,
      footer: {
        text: `Moderator: ${interaction.user.username}`,
        icon_url: interaction.user.displayAvatarURL(),
      },
    },
  ];

    const durationString = interaction.options.getString("duration");
    const duration = ms(durationString);
    if (!duration) {
        return await interaction.editReply({
            content: "Invalid duration format. Use 10s, 5m, 1h, or 2d.",
            ephemeral: true,
        });
    }

    if (!member || !member.bannable) {
        return await interaction.editReply({
            content: "I cannot mute this member.",
            ephemeral: true,
        });
    }
    
    await member.timeout(duration, reason).catch((e) => {
        console.log(e);
        return interaction.editReply({
            content: "I cannot mute this member.",
            ephemeral: true,
        });
    }
    );

  const modlog_save = new modlog({
    recipient: user.id,
    moderator: interaction.user.id,
    type: "mute",
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