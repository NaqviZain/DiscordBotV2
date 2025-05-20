export const data = {
    name: "messageCreate"
};
/**
 * 
 * @param {import("discord.js").Message} message
 * @param {import("../bot.js").Bot} client
 */
export async function execute(message, client) {
    if (!message.inGuild()) return;

    const prefix = "!";

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd === "embed") {
            /**@type {import("discord.js").APIEmbed[]} */
            const e = [
                {
                    color: client.settings.color,
                    footer: { text: `${message.guild.name}`, icon_url: message.guild.iconURL({ forceStatic: true }) },
                    title: "Test",
                    description: "test"
                }
            ];

        }
    }
}