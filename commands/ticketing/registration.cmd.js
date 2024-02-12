/**@type {import("../bot.js").Command} */
import Profile from "../schemas/profile_schema.js";

export const data = {
  name: "registration",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Edit your registered vehicles",
  options: [
    {
      name: "add",
      description: "Add a vehicle",
      type: 1,
      options: [
        {
          name: "vehicle-model",
          description: "Your vehicle model",
          type: 3,
          required: true,
        },
        {
          name: "color",
          description: "Your vehicle color",
          type: 3,
          required: true
        },
        {
          name: "plate",
          description: "Your vehicle plate",
          type: 3, 
          required: true
        }
      ],
    },
    {
      name: "remove",
      description: "Remove a vehicle",
      type: 1,
      options: [
        {
          name: "registration-id",
          description: "Obtain by viewing your vehicles",
          type: 10,
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
    case "add":
      await add(interaction, client);
      break;
    case "remove":
      await remove(interaction, client);
      break;
  }
}

async function add(interaction, client) {
  const registration_id = interaction.options.getNumber("registration-id");
  var resp = await Profile.findOne({ user_id: interaction.user.id });
  if (resp == null) {
    const new_profile = new Profile({
      user_id: user.id,
      citations: [{}],
      vehicles: [{}],
      license: false,
    });
    await new_profile.save();
    var resp = await Profile.findOne({ user_id: user.id });
  }

  const arr = resp["vehicles"];
  const vehicle_model = interaction.options.getString("vehicle-model")
  const color = interaction.options.getString("color")
  const plate = interaction.options.getString("plate")
  const id = Math.floor(Math.random() * (999999999999 - 1) + 1);
  
  arr.push({
    'Model': vehicle_model,
    'Color': color, 
    'Plate': plate, 
    'Id': id
  })
  resp.save(); 
  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: `Vehicle Added`,
      description: `> Model ${vehicle_model}\n> Color: ${color}\n> Plate: ${plate}\n> ID: ${id}`,
      color: client.settings.color,
    },
  ];

  
  await interaction.editReply({
    embeds: response, 
    ephemeral: true
  })
}

async function remove(interaction, client) {
  const channel = interaction.options.getChannel("reports", true);
  if (channel.type != 0)
    return await interaction.editReply({
      content: "The channel must be a text channel",
      ephemeral: true,
    });
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
