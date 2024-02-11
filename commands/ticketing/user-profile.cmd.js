/**@type {import("../bot.js").Command} */
import Profile from '../schemas/profile_schema.js'; 
import { ContextMenuCommandBuilder, ApplicationCommandType } from "discord.js";

export const data = {
    name: "View Profile",
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
    await interaction.deferReply({ephemeral: true});

    if (interaction.options.get('user') == null) {
        var user = interaction.user;
    } else if (interaction.options.get('user') != null) {
        var user = interaction.options.get('user').user;
    }
    var user = interaction.options.getMessage('message').author;  
    if (user.bot == true) {
        return await interaction.editReply({ content: "You cannot view a bot's profile", ephemeral: true });
    }

    var resp = await Profile.findOne({ user_id: user.id });
    if (resp == null) {
        const new_profile = new Profile({
            user_id: user.id,
            citations: [{}], 
            vehicles: [{}],
            license: false,
          });
        await new_profile.save(); 
        var resp = await Profile.findOne({ user_id: user.id });
    }
    if (resp['license'] == true) {
        var license = "Valid";
    } else if (resp['license'] == false) {
        var license = "Invalid";
    }

    const r = [
        {
            type: 1,
            /**@type {import("discord.js").APIButtonComponent[]} */
            components: [
                { label: "Registered Vehicles", type: 2, style: 1, custom_id: "registered_vehicles" },
                { label: "Citations", type: 2, style: 1, custom_id: "citations" }
            ]
        }
    ]

    /**@type {import("discord.js").APIEmbed[]} */
    const response = [{ 
        title: `${user.username}'s Profile`,
        color: client.settings.color,
        fields: [
            { name: "Citations", value: `${resp['citations'].length - 1}`, inline: true },
            { name: "Vehicles", value: `${resp['vehicles'].length - 1}`, inline: true },
            { name: "License", value: `${license}`, inline: true }
        ]
    }];
    
    await interaction.editReply({ embeds: response, components: r, ephemeral:false }); 
    
}