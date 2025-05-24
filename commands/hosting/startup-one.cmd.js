import fetch from "node-fetch";
import { startupSessions } from "../../data/mongodb.js";
import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

import config from "../../config.js";

let isProcessing = false;
const gameId = "5104202731";
const LICENSE_ROLE_ID = "1307838051157934140"; // Replace if needed
const NOTIFY_CHANNEL_ID = "1366484461050531941"; // Channel for unverified ping
const BLOXLINK_API_KEY = "bc88bfb4-979d-4978-976a-754fd21302a6";
const GUILD_ID = "992519039442223124";

// 👉 Handles the /join button

async function ownerId(discord_user) {
  const robloxIDResponse = await fetch(`https://api.blox.link/v4/public/guilds/${config.guildId}/discord-to-roblox/${discord_user.id}`, {
    headers: {
      "Authorization": config.bloxlink
    }
  });

  const robloxIDData = await robloxIDResponse.json();
  const robloxID = robloxIDData.robloxID;
 console.log(robloxID);
  return robloxID
}

// 👉 Checks player list and Bloxlink status
export async function checkPlayers(interaction) {
  const playersData = await fetchData();
  if (!playersData) {
    return interaction.reply({
      content: "Failed to fetch server player data.",
      ephemeral: true,
    });
  }

  const unverifiedUsers = [];

  for (const server of playersData) {
    for (const player of server.players) {
      try {
        const res = await fetch(
          `https://api.blox.link/v4/public/guilds/${GUILD_ID}/roblox-to-discord/${player.id}`,
          { headers: { Authorization: BLOXLINK_API_KEY } }
        );

        if (res.status === 404) {
          unverifiedUsers.push(player.displayName || player.name);
          continue;
        } else if (!res.ok) {
          console.error(`Bloxlink fail: ${player.name} - ${res.status}`);
          continue;
        }

        const data = await res.json();
        const discordUserId = data.discordId;
        const member = await interaction.guild.members.fetch(discordUserId).catch(() => null);

        if (!member) unverifiedUsers.push(player.displayName || player.name);
      } catch (err) {
        console.error(`Error checking Bloxlink for ${player.name}:`, err);
      }
    }
  }

  if (unverifiedUsers.length > 0) {
    const channel = await interaction.client.channels.fetch(NOTIFY_CHANNEL_ID);
    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle("Leaker/Unverified User Detected")
        .setDescription(
          `The following users are not in the Discord server or are unverified:\n\n${unverifiedUsers.map(u => `- ${u}`).join("\n")}`
        )
        .setColor("#FF0000");

      await channel.send({
        content: `<@${interaction.user.id}>`,
        embeds: [embed],
        allowedMentions: { parse: ["roles", "users", "everyone"] },
      });
    }
  }
}

// 👉 Fetches all private server player data from Roblox API
async function fetchData() {
  try {
    const response = await fetch(`https://games.roblox.com/v1/games/${gameId}/private-servers`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `.ROBLOSECURITY=REPLACE_THIS_WITH_YOUR_COOKIE`,
      },
    });
    const raw = await response.text();
    const data = JSON.parse(raw);
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching server data:", err);
    return null;
  }
}




export const data = new SlashCommandBuilder()
  .setName("startup-one")
  .setDescription("Manage session startup")
  .addSubcommand(sub =>
    sub.setName("start").setDescription("Start a new session")
            .addNumberOption(option =>
          option.setName("reactions")
            .setDescription("Amount of reactions needed to start the session")
            .setMaxValue(30)
            .setMinValue(2)
            .setRequired(true)
        )
  )
  .addSubcommand(sub =>
    sub.setName("release").setDescription("Release the session")
            .addStringOption(option =>
          option.setName("peacetime")
            .setDescription("Peacetime status")
            .addChoices(
              { name: "Normal", value: "normal" },
              { name: "Strict Peacetime", value: "strict" },
              { name: "Off", value: "off" }
            )
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("link")
            .setDescription("Server Link")
            .setRequired(true)
        )
        // .addBooleanOption(option =>
        //   option.setName("leo")
        //     .setDescription("Are there any current law enforcement officers on-duty?")
        //     .setRequired(true)
        // )
        .addStringOption(option =>
          option.setName("drifting")
            .setDescription("Is drifting fully on? Corners only? Off?")
            .addChoices(
              { name: "Fully On", value: "fully" },
              { name: "Corners Only", value: "corners" },
              { name: "Off", value: "off" }
            )
            .setRequired(true)
        )
  )
  .addSubcommand(sub =>
    sub.setName("end")
      .setDescription("End the session")
      .addStringOption(option =>
        option.setName("duration")
          .setDescription("Duration of the session")
          .setRequired(true)
      )
  );

    

export async function execute(interaction, client) {
  const sub = interaction.options.getSubcommand();
  const channel = await client.channels.fetch(client.settings.startup_channel);

if (sub === "start") {
  const reactions = interaction.options.getNumber("reactions");
  let hasReachedThreshold = false;

  const embed = new EmbedBuilder()
    .setTitle("Centreville Session Startup!")
    .setDescription(
      `<@${interaction.member.id}> is hosting a session! 10+ reactions are required for this session to commence.`
    )
    // .addFields(
    //   { name: "Minimum Reactions", value: reactions.toString(), inline: true },
    //   { name: "Session Status", value: "Awaiting Reactions", inline: true }
    // )
    .setColor(0x95a5a6);
 //   .setTimestamp(new Date());
 //   .setFooter({ text: "Any questions or concerns? Create a ticket!" });
   // .setImage("https://media.discordapp.net/attachments/825814443426054205/1231375130081624124/startup-1.png");

  await interaction.reply({
    content: "You are now hosting a session.\n\n**Make sure:** to invite the `gvrs_roleplay` ROBLOX account to the allowed list of players.",
    ephemeral: true,
  });

  const startupMessage = await interaction.channel.send({
    content: "@everyone ",
    embeds: [embed],
    allowedMentions: { parse: ["roles", "users", "everyone"] },
  });

  await startupMessage.react("✅");

  await startupSessions.create({
    messageId: startupMessage.id,
    channelId: interaction.channel.id,
    reactions: [],
    hostId: interaction.user.id,
    threshold: reactions,
  });

  const collector = startupMessage.createReactionCollector({
    filter: (r, u) => r.emoji.name === "✅" && !u.bot,
    dispose: true,
  });

  collector.on("collect", async (reaction, user) => {
    const session = await startupSessions.findOne({ messageId: startupMessage.id });
    if (!session.reactions.includes(user.id)) {
      session.reactions.push(user.id);
      await session.save();
    }

    if (!hasReachedThreshold && reaction.count >= reactions) {
      hasReachedThreshold = true;
      const logChannel = interaction.client.channels.cache.get("1353404595581358120");
      if (logChannel?.isTextBased()) {
        logChannel.send(`<@${interaction.user.id}> your startup has reached the required amount of reactions.`);
      }

      const updatedEmbed = EmbedBuilder.from(embed)
        .spliceFields(1, 1, { name: "Session Status", value: "Ready to start", inline: true });

      await startupMessage.edit({ embeds: [updatedEmbed] });
    }
  });

  collector.on("remove", async (reaction, user) => {
    const session = await startupSessions.findOne({ messageId: startupMessage.id });
    if (session?.reactions.includes(user.id)) {
      session.reactions = session.reactions.filter((id) => id !== user.id);
      await session.save();
    }
  });

  interaction.client.startupCollector = collector;
}




if (sub === "release") {
  const peacetime = interaction.options.getString("peacetime");
  const link = interaction.options.getString("link");
  const drifting = interaction.options.getString("drifting");

  interaction.client.startupOneLink = link;

const linkRegex = /^https:\/\/www\.roblox\.com/;
  if (!linkRegex.test(link)) {
    return await interaction.reply({
      embeds: [
        {
          title: "Invalid Link",
          description: "The link provided is invalid. It must start with https://www.roblox.com/...",
          color: 0xff0000,
        },
      ],
      ephemeral: true,
    });
  }

  let frpspeeds = "90MPH";
  if (peacetime === "strict") frpspeeds = "70MPH";
  else if (peacetime === "normal") frpspeeds = "80MPH";

  await interaction.reply({
    content: "Session has been released to civilians.",
    ephemeral: true,
  });

  const baseEmbed = new EmbedBuilder()
    .setTitle("Centreville Session Released!")
    .setDescription(`Read all rules in  before joining, all rules are strictly enforced.`)
    .addFields(
      { name: "Server Players", value: `0/40`, inline: true },
      { name: "Server Ping", value: `0ms`, inline: true },
      { name: "Server FPS", value: `0`, inline: true },
      { name: "Peacetime Status", value: capitalize(peacetime), inline: true },
      { name: "Drifting", value: drifting === "corners" ? "Corners Only" : drifting === "fully" ? "Fully On" : "Off", inline: true },
    )
    .setColor(0x5865f2)
    .setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL({ dynamic: true }),
    })
    .setImage("https://media.discordapp.net/attachments/825814443426054205/1231375168450859069/release-1.png");

  const msg = await interaction.channel.send({
    content: "@here",
    embeds: [baseEmbed],
    allowedMentions: { parse: ["roles", "users", "everyone"] },
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel("Join Session").setStyle(ButtonStyle.Primary).setCustomId("join")
      ),
    ],
  });

  // Setup interval updater
  async function updateStuff() {
    await checkPlayers(interaction);

    const data = await fetchData();
    if (!data) return;

    const id = await ownerId(interaction.user);
    const userOwnedServer = data.find((server) => server.owner.id == id);
    if (!userOwnedServer) return;

    const playerCount = userOwnedServer.playing;
    const serverPing = userOwnedServer.ping;
    const serverFPS = userOwnedServer.fps;

    const updatedEmbed = EmbedBuilder.from(baseEmbed)
      .spliceFields(0, 3,
        { name: "Server Players", value: `${playerCount}/40`, inline: true },
        { name: "Server Ping", value: `${serverPing}ms`, inline: true },
        { name: "Server FPS", value: `${serverFPS}`, inline: true }
      );

    await msg.edit({
      embeds: [updatedEmbed],
      components: msg.components,
    });
  }

  updateStuff(); // Initial update
  global.updateInterval = setInterval(updateStuff, 60 * 1000); // Repeat every 1 min
}

// Helper
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


if (sub === "end") {
  const duration = interaction.options.getString("duration");

  // Stop reaction collector if running
  if (interaction.client.startupCollector) {
    interaction.client.startupCollector.stop();
    interaction.client.startupCollector = null;
    console.log("Reaction collector stopped.");
  }

  // Clear interval
  if (global.updateInterval) {
    clearInterval(global.updateInterval);
    global.updateInterval = null;
    console.log("Session interval cleared.");
  }

  // Remove session from DB
  const session = await startupSessions.findOne();
  if (session) {
    const msg = await interaction.channel.messages.fetch(session.messageId).catch(() => null);
    if (msg) await msg.edit({ components: [] });
    await startupSessions.deleteOne({ messageId: session.messageId });
  }

  // Bulk delete recent (unpinned) message
  try {
    const recentMessages = await interaction.channel.messages.fetch({ limit: 1 });
    const deletable = recentMessages.filter((m) => !m.pinned);
    if (deletable.size > 0) {
      await interaction.channel.bulkDelete(deletable, true);
    }
  } catch (err) {
    console.error("Failed to delete message:", err);
  }

  // Final embed
  const embed = new EmbedBuilder()
    .setColor(0x6c78fc)
    .setTitle("Startup | Session Concluded")
    .setDescription(
      `> Thank you for attending the session & has now been concluded by <@${interaction.user.id}>.\n> Feel free to provide session feedback by clicking the button below.\n\n**Duration:** ${duration}`
    )
    .setImage("https://media.discordapp.net/attachments/979052032210120815/1265035786588393601/Copy_of_SWFL_STARTUP.png?ex=66b67562&is=66b523e2&hm=c8f8ed500125672871f09ddce57d28254b93ad22d8f06559198633048f4c44ac&=&format=webp&quality=lossless")
    .setFooter({ text: `Host: ${interaction.user.tag}` });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Session Feedback")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.com/channels/992519039442223124/1355933066069283006")
  );

  await interaction.reply({ content: "Command sent successfully.", ephemeral: true });
  await interaction.channel.send({ embeds: [embed], components: [row] });


}   
}


