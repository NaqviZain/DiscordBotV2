import { ActionRowBuilder, ButtonBuilder, Colors, EmbedBuilder } from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "early",
    type: 1, // 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Launch early access",
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
    const early_channel = client.channels.cache.get(client.settings.early_channel);
    if (!interaction.member.roles.cache.has(client.settings.staff_role))
        return await interaction.editReply({
            content: "You do not have permission to use this command.",
            ephemeral: true,
        });
    if (!early_channel)
        return await interaction.editReply({
            content: "Early access channel not found.",
            ephemeral: true,
        });
    const embed = new EmbedBuilder()
        .setTitle("Early Access")
        .setDescription(`> To obtain the session link, select the button that applies to your role. `)
        .setColor(Colors.Blurple)
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("membership_early")
                .setLabel("Membership")
                .setStyle(1),
            new ButtonBuilder()
                .setCustomId("staff_early")
                .setLabel("Staff")
                .setStyle(1),
            new ButtonBuilder()
                .setCustomId("leo_early")
                .setLabel("LEO")
                .setStyle(1),
        )
    await early_channel.send({ embeds: [embed], components: [row] });
    await interaction.editReply({
        content: "Early access launched.",
        ephemeral: true,
    });
    await interaction.deleteReply();
}
