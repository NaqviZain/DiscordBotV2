const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName ("help")
		.setDescription ("List of bot commands."),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(`#c00000`)
			.setTitle('Bot Commands')
			.setDescription('\nFeel free to send command suggestions to the high rank team. Bot is currently still in development expect bugs.')
			.setThumbnail(`https://cdn.discordapp.com/attachments/1177281870635999252/1180330462745481297/9e851851034343f7.png?ex=657d0767&is=656a9267&hm=0f62a0a8de38ece6c3b03629daab61f7a5a523d8853ea00bbdf4e4138d8231f2&`)
			.addFields(
				{
					name: '**Utility**',
					value: '• </avatar:1105620646026817616>\n• </botinfo:1105620646026817617>\n• </help:1105620646026817621>\n• </profile:1105620646026817623>\n• </suggestions:1180324001055244301>',
					inline: true
				},
			)
			.addFields(
				{
					name: 'Server Links',
					value: '\n• **[Roblox Group - Coming Soon]**\n• **[Staff Applications](https://forms.gle/4miZ2XJ1z7cL7LxR6)**',
					inline: false
				}
			);

		await interaction.reply({ embeds: [embed] });
	}
};
