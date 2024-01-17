const {SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("startup")
    .setDescription("Session Startup Slash Command")
    .addIntegerOption(option => option.setName('reactions').setDescription('Enter amount of required reactions').setRequired(true)),
    async execute (interaction) {
     const row = new ActionRowBuilder()
     .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .setMinValues(0)
            .setMaxValues(1)
            .setPlaceholder("Startup Information")
            .addOptions([
                {
                    label: 'Banned Vehicles & Guns',
                    description: 'Information on banned vehicles & guns.',
                    value: 'first_option',
                },
                {
                    label: 'Roleplay Information',
                    description: 'Information on Roleplay Rules',
                    value: 'second_option',
                },
            ]),
    );
        
        const int = interaction.options.getInteger('reactions');
        const embed = new EmbedBuilder()
			.setColor(`#c00000`)
			.setTitle('**Session Startup**')
			.setDescription(`> Prior to reacting, please ensure that you have read over: \n\n**•** <#1177281805028692060>\n**•** <#1177281811097866370>\n**•** <#1177441926971138059>\n\nIn order for the session to commence, we must reach **${int}+** reactions. `)
            .setImage("https://cdn.discordapp.com/attachments/910349152523792444/1083502596146352170/startup-1.png")
            .setFooter({text: `Session hosted by ${interaction.user.tag}`}); 

        await interaction.reply({content: " <@&892043331285180426>", embeds: [embed], allowedMentions: {parse: ['roles', 'users', 'everyone']}, components: [row] });
    }//allowedMentions: {parse: ["everyone"]}

}