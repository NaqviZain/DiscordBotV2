import { vehicle, ticket, economy } from "../../data/mongodb.js";
let robloxAvatarURL;

/**@type {import("../bot.js").Command} */
export const data = {
  name: "profile",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "view a profile",
  options: [
    {
      type: 6, // STRING Type
      name: "user",
      description: "What user",
      required: false,
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



  await interaction.deferReply({ ephemeral: false });
  if (interaction.options.get("user") == null) {
    var user = interaction.user;
var BLOXLINK_API_KEY = "bc88bfb4-979d-4978-976a-754fd21302a6";
var SERVER_ID = "992519039442223124";

// Get Roblox ID from Bloxlink
const robloxIDResponse = await fetch(`https://api.blox.link/v4/public/guilds/${SERVER_ID}/discord-to-roblox/${user.id}`, {
  headers: {
    "Authorization": BLOXLINK_API_KEY,
  }
});

if (!robloxIDResponse.ok) {
  return await interaction.editReply("Failed to fetch Roblox ID.");
}
var robloxIDData = await robloxIDResponse.json();
var robloxID = robloxIDData.robloxID;

// Fetch Roblox profile info
const robloxProfileResponse = await fetch(`https://users.roblox.com/v1/users/${robloxID}`);
if (!robloxProfileResponse.ok) {
  return await interaction.editReply("Failed to fetch Roblox profile.");
}
var robloxProfileData = await robloxProfileResponse.json();
var robloxUsername = robloxProfileData.name;
var robloxProfileURL = `https://www.roblox.com/users/${robloxID}/profile`;

// Roblox avatar
try {
  const _Fetch = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-bust?userids=${robloxID}&size=420x420&format=Png&isCircular=false`);
  const response = await _Fetch.json();
  robloxAvatarURL = response.data[0].imageUrl;
} catch (e) {
  console.error(e);
}


  } else if (interaction.options.get("user") != null) {
    var user = interaction.options.get("user").user;
  }

  if (user.bot) {
    return interaction.editReply({
      content: "You cannot view a bot's profile.",
    });
  }
  const vehicles = await vehicle.find({ ownerId: user.id });
  const tickets = await ticket.find({ recipient: user.id });
  let profile = await economy.findOne({ userId: user.id });
  if (!profile) {
    await economy.create({
      userId: user.id,
      balance: 0,
      bank: 0,
    });
  }
  profile = await economy.findOne({ userId: user.id });


  /**@type {import("discord.js").APIEmbed[]} */
const response = [
  {
  description: `
[${robloxUsername}](${robloxProfileURL})
ID: \`${robloxID}\`
Registered Vehicles: \`${vehicles.length}\`
Citations: \`${tickets.length}\`
`,
    thumbnail: {
      url: robloxAvatarURL ,
    },
        color: client.settings.color,
fields: [
  {
    name: "Balance",
    value: `$${profile.balance + profile.bank}`,
    inline: false,
  },
  {
    name: "Items",
    value:
      profile.inventory.length === 0
        ? "No items"
        : profile.inventory.map((item) => `\`${item}\``).join("\n"),
    inline: false,
  },
],


  },
];
  const r = [
    {
      type: 1,
      /**@type {import("discord.js").APIButtonComponent[]} */
      components: [
        { label: "Citations", type: 2, style: 1, custom_id: "citations" },
        {
          label: "Registered Vehicles",
          type: 2,
          style: 1,
          custom_id: "registered_vehicles",
        }

      ],
    },
  ];


  const message = interaction.editReply({
    embeds: response,
    components: r,
  });

  const collector = (await message).createMessageComponentCollector({
    filter: (componentInteraction) =>
      componentInteraction.user.id === interaction.user.id,
    time: 30000,
  });

  collector.on("collect", async (componentInteraction) => {
    await componentInteraction.deferReply({ ephemeral: true });

    if (componentInteraction.customId === "citations") {
      var tickets = await ticket.find({ recipient: user.id });
      /**@type {import("discord.js").APIEmbed[]} */
      var response = [
        {
          title: `${user.username}'s Citations`,
          color: client.settings.color,
        },
      ];

      if (tickets.length == 0) {
        response.description = "No Citations";
        return await componentInteraction.editReply({ embeds: response, ephemeral: true });
      } else {
        /**@type {import("discord.js").APIEmbed[]} */
        var response = [
          {
            title: `${user.username}'s Citations`,
            color: client.settings.color,
          },
        ];
        // trim the tickets to 25
        if (tickets.length > 25) {
          tickets = tickets.slice(0, 25);
          response[0].description = "Showing the first 25 citations";
        }
        response[0].fields = tickets.map((t) => ({
          name: "Ticket",
          value: `**Reason:** ${t.charges}\n**Fine:** ${t.fine}\n**Officer:** ${t.officer
            }\n**Case Number:** ${t.case}\n**Date:** <t:${Math.trunc(t.date / 1000)}:D>\n\n`,
          inline: false,
        }));
        return await componentInteraction.editReply({ embeds: response, ephemeral: true });

      }
    }
    if (componentInteraction.customId == "registered_vehicles") {
      const vehicles = await vehicle.find({ ownerId: user.id });
      if (vehicles.length == 0) {
        return await componentInteraction.editReply({
          content: "No registered vehicles.",
          ephemeral: true,
        });
      }
      /**@type {import("discord.js").APIEmbed[]} */
      var response = [
        {
          title: `${user.username}'s Vehicles`,
          color: client.settings.color,
        },
      ];
      response[0].fields = vehicles.map((v) => ({
        name: "REGISTERED VEHICLE",
        value: `**Vehicle:** ${v.vehicle}\n**Color:** ${v.color}\n**License Plate:** ${v.licensePlate}\n**ID:** ${v.vehicleId}\n**Date Registered:** <t:${Math.trunc(v.date / 1000)}:D>\n\n`,
        inline: false,
      }));
      return await componentInteraction.editReply({ embeds: response, ephemeral: true });
    }
  });

collector.on("end", async (collected, reason) => {
  if (reason === "time") {
    const disabledComponents = [
      {
        type: 1,
        components: [
          {
            label: "Citations",
            type: 2,
            style: 1,
            custom_id: "citations",
            disabled: true,
          },
          {
            label: "Registered Vehicles",
            type: 2,
            style: 1,
            custom_id: "registered_vehicles",
            disabled: true,
          },
        ],
      },
    ];

    await interaction.editReply({ components: disabledComponents });
  }
});

}