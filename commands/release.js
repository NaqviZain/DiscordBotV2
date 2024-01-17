const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("release")
    .setDescription("Link to the session. ")
    .addStringOption(option => option.setName('link').setDescription('Enter session link').setRequired(true))
    .addStringOption(option => option.setName('staff').setDescription('Is there additional staff?').setRequired(true).addChoices(
        { name: 'Yes', value: 'Yes' },
        { name: 'No', value: 'No' },
      ))
      .addStringOption(option => option.setName('peacetime').setDescription('peacetime status on or off?').setRequired(true).addChoices(
        { name: 'On', value: 'On' },
        { name: 'Off', value: 'Off' },
      )) 
      .addStringOption(option => option.setName('drifting').setDescription('drifting status on or off?').setRequired(true).addChoices(
        { name: 'On', value: 'On' },
        { name: 'Off', value: 'Off' },
      ))  
      .addStringOption(option => option.setName('emergencyservices').setDescription('Is there Emergency Services?').setRequired(true).addChoices(
        { name: 'Yes', value: 'Yes' },
        { name: 'No', value: 'No' },
      ))
      .addIntegerOption(option => option.setName('frpspeed').setDescription('FRP speed').setRequired(true)),

      
      
      
    
    
    async execute (interaction) {
        const Input = interaction.options.getString('link');
        const Staff = interaction.options.getString('staff');
        const ESS = interaction.options.getString('emergencyservices');
        const drifting = interaction.options.getString('drifting')
        const peacetime = interaction.options.getString('peacetime')
        const FRPspeed = interaction.options.getInteger('frpspeed');

        const EarlyAccess = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Join Session")
            .setCustomId(`Link_${Input}`)
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setLabel(`Session Information`)
            .setCustomId(`SessionInformation_${Staff}_${ESS}`) 
            .setStyle(ButtonStyle.Primary)
        )
        const setDesc = "\```Re-invites will be done every 10-15 minutes. Do not ask the host to do re-invites or you will be issued a punishment.\```";
        const embed = new EmbedBuilder()
			.setColor(`#6c78fc`)
			.setTitle('**Session Release**')
            .setDescription(`> The session has now been released. Ensure to follow all rules in <#858197893100732436>.\n\n**Session Information**\n> Peacetime: **${peacetime}**\n > FRP speeds: **${FRPspeed}** \n> Drifting Status: **${drifting}**\n\n ${setDesc}`)
            .setImage("https://media.discordapp.net/attachments/910349152523792444/1083504645508452372/release-1.png?width=1440&height=442")
            .setFooter({ text: `Session Host: ${interaction.user.tag}` })

            await interaction.reply({content: "Command sent successfully", ephemeral: true});
            await interaction.followUp({content: "@here" , embeds: [embed], allowedMentions: {parse: ["everyone"]} , components: [EarlyAccess]});
    }//allowedMentions: {parse: ["everyone"]}


}