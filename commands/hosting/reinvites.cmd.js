
/**@type {import("../bot.js").Command} */
export const data = {
    name: "reinvites",
    description: "Do Re-Invites",
    options: [
        {
            name: "peacetime",
            description: "The time for peacetime",
            required: true,
            type: 3,
            choices: [
                {
                    name: "Normal",
                    value: "normal",
                },
                {
                    name: "Strict",
                    value: "strict",
                },
            ],
        },
        {
            name: "link",
            description: "Link to the session",
            required: true,
            type: 3,
        },
    ],
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    dm_permission: false, // ensures that the command cannot be used inside of dms
    default_member_permissions: 0, // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({});
    if (!interaction.member.roles.cache.has(client.settings.staff_role))
        return await interaction.editReply({
            content: "You do not have permission to use this command.",
            ephemeral: true,
        });
    if (interaction.options.get("peacetime").value.toLowerCase() == "normal") {
        var pt = "Normal";
        var frp = 80;
    } else if (
        interaction.options.get("peacetime").value.toLowerCase() == "strict"
    ) {
        var pt = "Strict";
        var frp = 60;
    }
    const link = interaction.options.getString("link", true);


    const joinSession = `[Session Link](${link})`;


    /**@type {import("discord.js").APIEmbed[]} */
    const resp_embed = [
        {
            title: "Centreville Session Re-Invites!",
            description: `Peacetime: **${pt}**\nFRP Speeds: **${frp}**\n\nKick = Infraction\n\nRead all <#1360038704772677692> before joining, all rules are strictly enforced.\n\n> ${joinSession}`,
            color: 0xffffff,
        },
    ];

    const msg = await interaction.channel?.send({
        content: "@here",
        embeds: resp_embed,
        allowedMentions: { parse: ["everyone"] },
    });

    await interaction.deleteReply();
}