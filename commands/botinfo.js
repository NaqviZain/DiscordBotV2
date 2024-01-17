const { SlashCommandBuilder, EmbedBuilder, version: djsVersion } = require('discord.js');
const { version: botVersion } = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Information about the bot."),
  async execute(interaction) {
    const botUser = interaction.client.user;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);
    const guildId = interaction.guildId;
    const guild = interaction.guild;
    const memberCount = guild.memberCount;
    const botInfoEmbed = new EmbedBuilder()
      .setColor('#c00000')
      .setTitle('Bot Information')
      .setDescription('Here is some useful information regarding the bot')
      .addFields(
        { name: 'Bot Version', value: `1.1.0` , inline: true },
        { name: 'Discord.js Version', value: djsVersion, inline: true  },
        { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true  },
        { name: 'Members', value: `${memberCount}`, inline: true  },
        { name: 'Language', value: 'JavaScript', inline: true  },
        { name: 'Developer', value: 'phoenixx#0054', inline: true },
        { name: 'Designer', value: '_jay#0001', inline: true },
      )

    await interaction.reply({ embeds: [botInfoEmbed] });
  },
};
