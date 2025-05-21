import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { economy } from "../../data/mongodb.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "leaderboard",
    type: 1, 
    description: "View the leaderboard",
    dm_permission: false,
    default_member_permissions: 0,
};

/**
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const profiles = await economy.find({}).sort({ balance: -1 }).limit(30);
    if (!profiles.length) {
        return interaction.editReply({ content: "No leaderboard data found." });
    }

    let currentPage = 0;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(profiles.length / itemsPerPage);

    const getPageEmbed = (page) => {
        const start = page * itemsPerPage;
        const pageProfiles = profiles.slice(start, start + itemsPerPage);

        const embed = new EmbedBuilder()
            .setTitle("🏆 Leaderboard")
            .setColor("Gold")
            .setFooter({ text: `Page ${page + 1} of ${totalPages}` });

        let description = "";
        pageProfiles.forEach((profile, index) => {
            const rank = start + index + 1;
            const user = client.users.cache.get(profile.userId);
            const tag = user ? `${user.username}` : `Unknown User (${profile.userId})`;
            description += `**#${rank}** - ${tag} • 💰 $${profile.balance + profile.bank}\n`;
        });

        embed.setDescription(description);
        return embed;
    };

    const getButtons = (page) => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("prev_page")
                .setLabel("Previous")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(page === 0),

            new ButtonBuilder()
                .setCustomId("next_page")
                .setLabel("Next")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(page === totalPages - 1)
        );
    };

    const message = await interaction.editReply({
        embeds: [getPageEmbed(currentPage)],
        components: [getButtons(currentPage)],
    });

    const collector = message.createMessageComponentCollector({
        filter: (i) => i.user.id === interaction.user.id,
        time: 60000,
    });

    collector.on("collect", async (i) => {
        if (i.customId === "prev_page") {
            currentPage = Math.max(0, currentPage - 1);
        } else if (i.customId === "next_page") {
            currentPage = Math.min(totalPages - 1, currentPage + 1);
        }

        await i.update({
            embeds: [getPageEmbed(currentPage)],
            components: [getButtons(currentPage)],
        });
    });

    collector.on("end", async () => {
        try {
            await message.edit({ components: [] }); // Remove buttons after timeout
        } catch (err) {
            console.warn("Leaderboard interaction expired or failed to update:", err.message);
        }
    });
}
