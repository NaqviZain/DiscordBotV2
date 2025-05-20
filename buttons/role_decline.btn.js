import { Colors, EmbedBuilder} from "discord.js";

export const data = {
    name: 'role_decline'
};
/**
 * @param {import("discord.js").ButtonInteraction<"cached">} int
 * @param {import("../bot").Bot} client
 */
export async function execute(int, client) {

    await int.deferReply({ ephemeral: true });

    const role = int.guild.roles.cache.get(client.settings.role_request);
    if (!int.member.roles.cache.has(client.settings.role_request) && !int.member.permissions.has("ManageRoles")) return int.editReply({ content: "You do not have permission to use this command" });
    if (!role) return int.editReply({ content: "Role not found" });

    const message = await int.message.fetch();
    const oldEmbed = message.embeds[0];
    const newEmbed = EmbedBuilder.from(oldEmbed)
        .setColor(Colors.Red)
        .setDescription(`Declined by ${int.user.username}`);

    await message.edit({
        embeds: [newEmbed],
        components: []
    });


    const log_channel = await client.channels.fetch(client.settings.log_channel);
    if (log_channel) {
        await log_channel.send({
            embeds: [newEmbed],
        });
    } else {
        console.log("Log channel not found");
    }

    await int.editReply({ content: "Role request declined" });
};