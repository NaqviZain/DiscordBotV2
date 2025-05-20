import { Colors, EmbedBuilder } from "discord.js";

export const data = {
    name: 'ticket_claim'
};
/**
 * @param {import("discord.js").ButtonInteraction<"cached">} int
 * @param {import("../bot").Bot} client
 */
export async function execute(int, client) {

    await int.deferReply({ ephemeral: true });
    if (!int.member.roles.cache.has(client.settings.staff_role)) return int.editReply({ content: "You do not have permission to use this command" });
    await int.editReply({ content: "Ticket claimed" });

    const channel = int.channel;
    await channel.permissionOverwrites.edit(int.user.id, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true
    });
    await channel.permissionOverwrites.edit(client.settings.staff_role, {
        ViewChannel: false,
        SendMessages: false,
        ReadMessageHistory: false
    });

};