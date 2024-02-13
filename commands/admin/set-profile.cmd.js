import Profile from "../schemas/profile_schema.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "profile-picture",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Reset database",
  options: [
    {
      name: "link",
      description: "image link",
      required: true,
      type: 3
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
  interaction.deferReply({ephemeral: true})
  const link = interaction.options.get("link").value;

  try{
    await client?.user?.setAvatar(link);
    interaction.editReply({content:"Profile changed", ephermal: true});
  } catch(err)
  {
    interaction.editReply({content:"Error. Most likely an invalid link", ephermal: true});
  }



}
