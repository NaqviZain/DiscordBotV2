const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("early")
    .setDescription("Link to the session. "),
    async execute (interaction) {
        const Input = interaction.options.getString('input');


        const embed = new EmbedBuilder()
			.setColor(`#c00000`)
			.setTitle('**Early Access**')
			.setDescription(`> To join the server, use the code: **tampaa** no spaces or capitals. The host will announce when the session is released.`)


            //await interaction.reply({content: "Command sent successfully", ephemeral: true});
            await interaction.reply({content: "<@&892043331285180426>", embeds: [embed], allowedMentions: {parse: ['roles', 'users', 'everyone']}})
    }//allowedMentions: {parse: ["everyone"]}


}