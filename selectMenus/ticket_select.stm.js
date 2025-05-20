import { ModalBuilder , ActionRowBuilder, TextInputBuilder, TextInputStyle} from "discord.js"

export const data = {
    name: "ticket_select",
}
/**
 * @param {import("discord.js").StringSelectMenuInteraction<"cached">} interaction
 * @param {import("../bot.js").Bot} client
 */

export async function execute(interaction, client) {

    const pick = interaction.values[0]

    // capitalize the first letter of the pick


    const modal = new ModalBuilder()
        .setCustomId('ticket_modal' + pick)

    


    if (pick === "support") {
        modal.setTitle("Support Ticket")

        var input = new TextInputBuilder()
            .setCustomId('ticket_input_description')
            .setLabel("Description of your issue") 
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Description of your issue")
            .setRequired(true)
            .setMaxLength(2000)

        const row = new ActionRowBuilder().addComponents(input);
        modal.addComponents(row);
        
    }
    else if (pick === "staff_support") {
        modal.setTitle("Staff Support Ticket")
        var user_id = new TextInputBuilder()
            .setCustomId('ticket_input_user_id')
            .setLabel("User ID of the staff member")
            .setStyle(TextInputStyle.Short) 
            .setPlaceholder("539213950688952320")
            .setRequired(true)
        
        var reason = new TextInputBuilder()
            .setCustomId('ticket_input_reason')
            .setLabel("Reason for reporting")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Reason for reporting")
            .setRequired(true)
            .setMaxLength(2000)
        const row = new ActionRowBuilder().addComponents(user_id);
        const row2 = new ActionRowBuilder().addComponents(reason);
        modal.addComponents(row, row2);
    }






    // Add the row to the modal

    // Show the modal to the user
    await interaction.showModal(modal);


}