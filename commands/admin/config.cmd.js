/**@type {import("../bot.js").Command} */

import Config from "../schemas/config_schema.js";

export const data = {
  name: "config",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Edit the bot's configuration",
  options: [
    {
      name: "log-channel",
      description: "Set the log channel",
      type: 1,
      options: [
        {
          name: "channel",
          description: "The channel to set as the log channel",
          type: 7,
          required: true,
        },
      ],
    },
    {
      name: "reports",
      description: "Set the reports channel",
      type: 1,
      options: [
        {
          name: "reports",
          description: "The channel to set as the reports channel",
          type: 7,
          required: true,
        },
      ],
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
  const cmd = interaction.options.getSubcommand();

  switch (cmd) {
    case "log-channel":
      await logChannel(interaction, client);
      break;
    case "reports":
      await reportsChannel(interaction, client);
      break;
  }
}

async function logChannel(interaction, client) {
  const channel = interaction.options.getChannel("channel", true);
  const id = channel.id;
  const resp = await Config.findOne({ config: "config" });

  if (resp == null) {
    return await interaction.editReply({
      content:
        "No config found, this shouldn't be possible. Contact <@539213950688952320>",
      ephemeral: true,
    });
  }

  resp.log_channel = id; // set the log channel to the channel id
  await resp.save();

  await interaction.editReply({
    content: `Log channel set to <#${id}>`,
    ephemeral: true,
  });
}


async function reportsChannel(interaction, client) {
  const channel = interaction.options.getChannel("reports", true);
  const id = channel.id;
  const resp = await Config.findOne({ config: "config" });

  if (resp == null) {
    return await interaction.editReply({
      content:
        "No config found, this shouldn't be possible. Contact <@539213950688952320>",
      ephemeral: true,
    });
  }

  resp.reports_channel = id; // set the reports channel to the channel id
  await resp.save();

  await interaction.editReply({
    content: `Reports channel set to <#${id}>`,
    ephemeral: true,
  });
}