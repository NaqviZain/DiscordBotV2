import { Colors, SelectMenuBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "shop",
  type: 1, // 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Access the shop",
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
  const items = client.settings.shop;

    const embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setDescription(`
            Choose items to purchase via the dropdown.
            
            **Items**:
            ${items.map(item => `\`${item.name}\` - $${item.price} - ${item.description}`).join("\n")}
        `)
        .setColor(Colors.Green)
    
    const select = new StringSelectMenuBuilder()
        .setCustomId("shop_select")
        .setPlaceholder("Select an item to purchase")
        .addOptions(
            items.map(item => ({
                label: item.name + " - $" + item.price,
                value: item.type,
                description: item.description,
                emoji: item.emoji,
            }))
        )

    const row = new ActionRowBuilder().addComponents(select)
    await interaction.editReply({ embeds: [embed], components: [row] });
}
