/**@type {import("../bot.js").Command} */
export const data = {
    name: "reinvites",
    type: 3, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    dm_permission: false, // ensures that the command cannot be used inside of dms
    default_member_permissions: 0 // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    
    const messageContent = interaction.options.getMessage('message').content;

    // Regular expression to match URLs
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    // Search for links in the message content
    const foundLinks = messageContent.match(linkRegex);

    if (foundLinks && foundLinks.length > 0) {
        interaction.reply({ content: `Found link: ${foundLinks[0]}` });
    } else {
        interaction.reply({ content: 'No links found in the provided message.', ephemeral: true });
    }
}