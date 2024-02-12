import Profile from "../schemas/profile_schema.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "reset",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Reset database",
  options: [
    {
      name: "sure",
      description: "Are you sure",
      required: true,
      type: 3,
      choices: [
        {
          name: "No",
          value: "no",
        },
        {
          name: "Yes",
          value: "yes",
        },
      ],
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
  if (interaction.options.get("sure").value.toLowerCase() == "yes") {
    const documents = await Profile.find({});
    var count = 0; 
    // Iterate over each document
    for (const doc of documents) {
        // Reset the array field
        doc.vehicles = [{}];
        doc.citations = [{}];
        var count = count + 1; 
        // Save the updated document
        await doc.save();
    }

    await interaction.editReply({
      content: `Reset ${count} documents`,
      ephemeral: true,
    })
  } else {
  
    await interaction.editReply({
    content: `Cancelled`,
    ephemeral: true});
}
  
}
