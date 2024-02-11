/**@type {import("../bot.js").Command} */

import Profile from "../schemas/profile_schema.js";

export const data = {
    name: "blacklist",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Blacklist a user from the bot",
    options: [
        {
            type: 9, // MENTIONABLE Type
            name: "user",
            description: "What user to blacklist",
            required: true
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
    const user = interaction.options.get('user').user; 
    const log_channel = client.channels.cache.get(process.env.log_channel);


    var resp = await Profile.findOne({ user_id: user.id });
    if (resp == null) {
        const black = new Profile({
            user_id: user.id,
            citations: [{}], 
            vehicles: [{}],
            license: false,
            blacklisted: true
          });
        await black.save(); 
        /**@type {import("discord.js").APIEmbed[]} */
        const response = [{ 
            title: `Blacklisted User`,
            description: `${user} has been blacklisted from non-essential commands by ${interaction.user}`,
            color: client.settings.color,
        }];
    
        log_channel.send({
            embeds: response
        });
        return await interaction.editReply({ content: `Blacklisted <@${user.id}> from non-essential commands.`, ephemeral: true });
    }

    if (resp['blacklisted'] == true) {
        return await interaction.editReply({ content: `<@${user.id}> is already blacklisted.`, ephemeral: true });
    } else if (resp['blacklisted'] == false) {
        resp['blacklisted'] = true;
        await resp.save();
        /**@type {import("discord.js").APIEmbed[]} */
        const response = [{ 
            title: `Blacklisted User`,
            description: `${user} has been blacklisted from non-essential commands by ${interaction.user}`,
            color: client.settings.color,
        }];
    
        log_channel.send({
            embeds: response
        });
        return await interaction.editReply({ content: `Blacklisted <@${user.id}> from non-essential commands.`, ephemeral: true });
    }


    
}