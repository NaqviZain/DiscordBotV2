/**@type {import("../bot.js").Command} */
export const data = {
    name: "ping",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Pings the bot",
    dm_permission: false, // ensures that the command cannot be used inside of dms
    default_member_permissions: 0 // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply();

    const cS = await interaction.channel?.send({ content: "Getting Latency... 🏓", fetchReply: true });

    /**@type {import("discord.js").APIEmbed} */
    const response = {
        title: "Pong!", 
        description: `**Ping: ${client.ws.ping}ms**`,
        color: client.settings.color,
        fields: [
            { name: "API Ping", value: `\`\`\`${client.ws.ping}\`\`\``, inline: true },
            { name: "Bot Ping", value: `\`\`\`${cS}`}
        ] // tf is that even english lol, xml is a language, was gonna put it in another color for the ping
    }
    await interaction.editReply({embeds: response}) // look at discord
    
}