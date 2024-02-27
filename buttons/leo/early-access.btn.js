export const data = {
    name: "early_access",
}
/**
 * @param {import("discord.js").ButtonInteraction} interaction
 * @param {import("../bot.js").Bot} client
 */

export async function execute(interaction, client) {

    const EarlyAccessRoles = ["1207328977379663902"]; 
    const EarlyAccessLink = interaction.message.embeds[1].description;

    const hasEarlyAccess = EarlyAccessRoles.some(roleId => interaction.member.roles.cache.has(roleId));
    if (!hasEarlyAccess) {
        return interaction.reply({
            content: `You don't have permission to use the Early Access button!`,
            ephemeral: true,
        });
    }

    return await interaction.reply({
        content: EarlyAccessLink,
        ephemeral: true, 
    })
}