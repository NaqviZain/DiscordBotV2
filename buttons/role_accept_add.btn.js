import { Colors, EmbedBuilder} from "discord.js";

export const data = {
    name: 'role_accept_add'
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

    const embed = int.message.embeds[0];
    if (!embed || !embed.fields || !embed.fields[1]) {
        return int.editReply({ content: "No roles found in the embed." });
    }

    // Extract all role IDs from mentions and raw IDs
    const roleMentions = Array.from(embed.fields[1].value.matchAll(/<@&(\d+)>/g)).map(match => match[1]);
    const idMatches = Array.from(embed.fields[1].value.matchAll(/\b\d{17,}\b/g)).map(match => match[0]);
    const roles = Array.from(new Set([...roleMentions, ...idMatches]));

    if (roles.length === 0) {
        return int.editReply({ content: "No valid roles found to add." });
    }

    // Get the user to add roles to (from the embed field)
    const userIdMatch = embed.fields[0].value.match(/\d{17,}/);
    if (!userIdMatch) {
        return int.editReply({ content: "Could not determine user to add roles to." });
    }
    const member = await int.guild.members.fetch(userIdMatch[0]);

    let added = [];
    let failed = [];

    for (const roleId of roles) {
        const role = int.guild.roles.cache.get(roleId);
        if (!role) {
            failed.push(roleId);
            continue;
        }
        try {
            await member.roles.add(role);
            added.push(roleId);
        } catch {
            failed.push(roleId);
        }
    }

    await int.editReply({
        content: [
            added.length ? `Added roles: ${added.map(r => `<@&${r}>`).join(", ")}` : "",
            failed.length ? `Failed to add: ${failed.map(r => `<@&${r}>`).join(", ")}` : ""
        ].filter(Boolean).join("\n")
    });

    // fetch embed message and remove the button and edit description and color
    const message = await int.message.fetch();
    const oldEmbed = message.embeds[0];
    const newEmbed = EmbedBuilder.from(oldEmbed)
        .setColor(Colors.Green)
        .setDescription(`Approved by ${int.user.username}`);

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
};