import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Colors, ButtonBuilder } from "discord.js"
import { economy } from "../data/mongodb.js"
const activeCollectors = new Map(); // Tracks active collectors per user


export const data = {
    name: "shop_select",
}
/**
 * @param {import("discord.js").StringSelectMenuInteraction<"cached">} interaction
 * @param {import("../bot.js").Bot} client
 */

export async function execute(interaction, client) {
    const pick = interaction.values[0];
    const shop = client.settings.shop;
    const item = shop.find((item) => item.type === pick);

    if (!item) {
        return interaction.reply({
            content: "Item not found.",
            ephemeral: true,
        });
    }

    const { price, name, description, type, roleId } = item;
    const role = client.guilds.cache.get(interaction.guild.id).roles.cache.get(roleId);

    let profile = await economy.findOne({ userId: interaction.user.id });
    if (!profile) {
        await economy.create({
            userId: interaction.user.id,
            balance: 0,
            bank: 0,
        });
        profile = await economy.findOne({ userId: interaction.user.id });
    }

    const alreadyHasRole = interaction.member.roles.cache.has(roleId);
    if (type === "add_role") {
        if (!role) {
            return interaction.reply({
                content: "Role not found.",
                ephemeral: true,
            });
        }

        if (alreadyHasRole) {
            return interaction.reply({
                content: `You already have a \`${name}\``,
                ephemeral: true,
            });
        }
    }

    if (profile.balance < price) {
        return interaction.reply({
            content: `You do not have enough money to purchase this item. You need $${price}.`,
            ephemeral: true,
        });
    }

    const embed = new EmbedBuilder()
        .setDescription(`Are you sure you want to purchase \`${name}\` for $${price}?`)
        .setColor(Colors.Green);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("shop_purchase")
            .setLabel("Purchase")
            .setStyle(3)
            .setEmoji("🛒")
    );

    await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
    });

    // Cancel any existing collector for this user
    if (activeCollectors.has(interaction.user.id)) {
        const previous = activeCollectors.get(interaction.user.id);
        previous.stop("replaced");
    }

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    activeCollectors.set(interaction.user.id, collector);

    collector.on("collect", async (i) => {
        if (i.customId === "shop_purchase") {
            try {
                if (type === "add_role" && role) {
                    await interaction.member.roles.add(role);
                }

                await economy.updateOne(
                    { userId: interaction.user.id },
                    {
                        $inc: { balance: -price },
                        $push: { inventory: name }
                    }
                );

                await i.update({
                    embeds: [embed.setDescription(`You have purchased \`${name}\` for $${price}.`)],
                    components: [],
                });
            } catch (error) {
                console.error(error);
                await i.update({
                    content: "There was an error processing your purchase.",
                    embeds: [],
                    components: [],
                });
            }
            collector.stop("completed");
        }
    });

    collector.on("end", async (collected, reason) => {
        activeCollectors.delete(interaction.user.id);

        if (collected.size === 0 && reason !== "completed" && reason !== "replaced") {
            try {
                await interaction.editReply({
                    content: "You took too long to respond.",
                    embeds: [],
                    components: [],
                });
            } catch (err) {
                console.warn("EditReply failed, possibly already updated:", err.message);
            }
        }
    });
}
