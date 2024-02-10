/**@type {import("../bot.js").Command} */
export const data = {
    name: "release",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Release the session",
    options: [
        {
            name: 'peacetime',
            description: 'The time for peacetime',
            required: true,
            type: 3, 
            choices: [
                {
                    name: 'Normal', 
                    value: 'normal',
                },
                {
                    name: 'Strict', 
                    value: 'strict',
                }
            ]
        },
        {
            name: 'link', 
            description: 'Link to the session',
            required: true, 
            type: 3
        }
    ],
    dm_permission: false, // ensures that the command cannot be used inside of dms
    default_member_permissions: 0 // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    if (interaction.options.get('peacetime').value.toLowerCase() == 'normal') {
        var pt = 'Normal';
        var frp = 80;
    } 
    else if (interaction.options.get('peacetime').value.toLowerCase() == 'strict') {
        var pt = 'Strict'; 
        var frp = 60; 
    };
    const link = interaction.options.getString("link", true);


    /**@type {import("discord.js").APIEmbed[]} */
    const resp_embed = [{
        title: "Session Release",
        description: `Peacetime: **${pt}**\nFRP Speeds: **${frp}**\n\nKick = Infraction\n\nRead all server information before joining, all rules are strictly enforced.`,
        color: client.settings.color,
    }]

    const msg = await interaction.channel?.send({
        content: "@.everyone",
        embeds: resp_embed, 
    });
    
    await interaction.deleteReply();
}