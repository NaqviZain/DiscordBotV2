import { Message } from "discord.js";
import Config from "../schemas/config_schema.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "startup",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start a session",
  options: [
    {
      type: 4, // INT Type
      name: "reactions",
      description: "Amount of reactions",
      required: true,
      autocomplete: false,
      max_value: 25,
      min_value: 5,
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
  await interaction.deferReply({ephemeral:true})
  const reactions = interaction.options.getInteger("reactions");
  const user = interaction.member;

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: "Session Startup",
      description: `<@${interaction.member.id}> is hosting a session! ${reactions} reactions are required to start the session.`,
      color: client.settings.color,
    },
  ];

  const log = [
    {
      title: `Attempted Session Startup`,
      description: `${interaction.user} has attempted a session startup`,
      color: 0x00ffff,
    },
  ];
  var resp = await Config.findOne({ config:"config"});
  if (resp == null) return await interaction.editReply({content:"An error has occured. Failure to connect to database", ephemeral: true})
  const channel = await client.channels.cache.get(resp['log_channel']); // get the channel from the cache

  channel.send({ embeds: log }); // send the report to the logs channel

  await interaction.editReply({
    content: "@.everyone",
    embeds: response,
  });
}
