import { Colors, EmbedBuilder } from "discord.js";

export const data = {
    name: 'staff_early'
};
/**
 * @param {import("discord.js").ButtonInteraction<"cached">} int
 * @param {import("../bot").Bot} client
 */
export async function execute(int, client) {

    await int.deferReply({ ephemeral: false });

    await int.followUp({
        content: `<@${int.user.id}> has requested to join as 'Staff'`
    })
};