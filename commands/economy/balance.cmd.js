import { EmbedBuilder } from "discord.js";
import { economy } from "../../data/mongodb.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "balance",
    type: 1, 
    description: "get your balance",
    options: [
      {
        type: 6, // STRING Type
        name: "user",
        description: "what user ",
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
    const user = interaction.options.getUser("user") || interaction.user;

    const profile = await economy.findOne({ userId: user.id });
    if (!profile) economy.create({ userId: user.id });
    const userProfile = await economy.findOne({ userId: user.id });
    if (!userProfile) return await interaction.editReply({ content: "No profile found" });
    const balance = userProfile.balance;
    const bank = userProfile.bank;

    const embed = new EmbedBuilder()
      .setColor('#95a5a6')
      .setTitle(`${user.username}'s Balance`)
      .addFields(
        { name: 'Cash:', value: `$${balance}`, inline: true },
        { name: 'Bank:', value: `$${bank}`, inline: true },
        { name: 'Total:', value: `$${balance + bank}`, inline: true }
      )
      .setFooter({ text: 'Balance Check', iconURL: interaction.guild.iconURL({ dynamic: true }) });

    await interaction.editReply({ embeds: [embed] });

  }
  