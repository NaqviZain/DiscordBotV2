const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('end')
		.setDescription('Session over')
        .addStringOption(option => option.setName('duration').setDescription('Enter session duration').setRequired(true)),
	 async execute(interaction) {
        const int1 = interaction.options.getString('duration');
        const embed1 = new EmbedBuilder() 
            .setColor(`#c00000`)
			.setTitle('Server Shutdown')
			.setDescription(`> The total duration of this session was ${int1}\n\n **Session Feedback Form:** https://forms.gle/Q1TEKzYKFkAcvW1u7/
			`)
			.setFooter({text: `Host: ${interaction.user.tag}`});
            if (int1) return interaction.reply({ embeds: [embed1] });;
	},
};