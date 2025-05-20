import { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "ticket_msg",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "send ticket message",
    dm_permission: false, 
    default_member_permissions: 0, 
  };
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
   * @param {import("../bot.js").Bot} client
   */
  export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true }); 

    const support = client.channels.cache.get(client.settings.support);
    if (!support) return await interaction.editReply({ content: "Support channel not found", ephemeral: true });

    const embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setTitle("Server Support")
        .setDescription("For any questions or concerns regarding all operations of Centreville, please open up a respective ticket according to your needs.\n\n**Support** 🔨 ``➔`` For any concerns or questions you may have about any server related issues, open a ticket and fill out the format.\n\n**Staff Support** ``🛠️`` ➔ If you believe a Staff Member is at fault for violating their staff policies or server regulations, please ensure you have collected valid evidence beforehand and open the respective ticket")

    const select = new SelectMenuBuilder()
        .setCustomId("ticket_select")
        .setPlaceholder("Select a ticket type")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Support")
                .setValue("support")
                .setDescription("General Support")
                .setEmoji("🔨"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Staff Support")
                .setValue("staff_support")
                .setDescription("Report a staff member")
                .setEmoji("🛠️"),
        )
    
    const row = new ActionRowBuilder().addComponents(select)

    await support.send({ embeds: [embed], components: [row] });

    await interaction.editReply({ content: "Ticket message sent", ephemeral: true });
    
  }
  