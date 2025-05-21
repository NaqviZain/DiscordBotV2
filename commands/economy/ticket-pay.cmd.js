import { Colors, EmbedBuilder } from "discord.js";
import { ticket, economy} from "../../data/mongodb.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "ticket-pay",
    type: 1, // 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Pay a ticket",
    options: [
      {
        type: 3, // STRING Type
        name: "ticket",
        description: "What ticket to pay off",
        required: true,
        autocomplete: true,
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
    await interaction.deferReply({ ephemeral: true }); 

    const embed = new EmbedBuilder()
        .setTitle('Ticket Payment')
        .setColor(Colors.Greyple);

    const ticketId = interaction.options.getString("ticket");
    const ticket_to_pay = await ticket.findOne({ case: ticketId, recipient: interaction.user.id }); // Ensure this is awaited
    if (!ticket_to_pay) return await interaction.editReply({ content: "Ticket not found" });

    const ticketFine = ticket_to_pay.fine;
    if (typeof ticketFine !== "number" || isNaN(ticketFine)) {
        embed.setDescription("Invalid ticket fine amount.");
        embed.setColor(Colors.Red);
        return await interaction.editReply({ embeds: [embed] });
    }

    const userProfile = await economy.findOne({ userId: interaction.user.id });
    if (!userProfile || typeof userProfile.balance !== "number" || isNaN(userProfile.balance)) {
        embed.setDescription("You don't have enough money to pay this ticket.");
        embed.setColor(Colors.Red);
        return await interaction.editReply({ embeds: [embed] });
    }

    const userBalance = userProfile.balance;
    if (userBalance < ticketFine) {
        embed.setDescription("You don't have enough money to pay this ticket.");
        embed.setColor(Colors.Red);
        return await interaction.editReply({ embeds: [embed] });
    }

    // Deduct the fine from the user's balance
    userProfile.balance -= ticketFine;
    await userProfile.save();

    // Delete the ticket
    await ticket.deleteOne({ case: ticketId, recipient: interaction.user.id });

    embed.setDescription(`
        **Case ID**: \`\`${ticket_to_pay.report_num}\`\`
        **Fine**: $${ticketFine}
        **Status**: Paid
        `);
    embed.setColor(Colors.Green);
    embed.setFooter({ text: `Ticket ID: ${ticketId}` });
    embed.setTimestamp();
    await interaction.editReply({ embeds: [embed] });
}

    /**
     * @param {import("discord.js").AutocompleteInteraction} interaction
     * @param {import("../bot.js").Bot} client
     */
    export async function autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = await ticket.find({ recipient: interaction.user.id });
      
        // Ensure charges exist and filter based on the focused value
        const filtered = choices.filter((choice) => choice.charges && choice.charges.startsWith(focusedValue));
        const sliced = filtered.slice(0, 25);
      
        // Map the response, converting the value to a string
        await interaction.respond(
          sliced.map((choice) => ({
            name: choice.charges,
            value: String(choice.case), // Convert fine to a string
          }))
        );
    }
  