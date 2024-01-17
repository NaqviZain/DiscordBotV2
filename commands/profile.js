
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('profile')
      .setDescription('Displays user profile information')
      .addUserOption(option => 
        option.setName('user')
        .setDescription('The user to get profile information for.')
        .setRequired(false)
      ),
    async execute(interaction) {
      const user = interaction.options.getUser('user') || interaction.user;
      const cars = fs.existsSync('./cars.json')
        ? JSON.parse(fs.readFileSync('./cars.json', 'utf8'))
        : [];
    
      const userCars = cars.filter((car) => car.userID === user.id);
    
      const profileEmbed = new EmbedBuilder()
      .setColor('#6c78fc')
      .setTitle('Profile Information')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Username', value: user.username +`#`+user.discriminator, inline: true },
        { name: 'ID', value: user.id , inline: true },
        { name: 'Vehicle Registrations', value: userCars.length === 0 ? 'You do not have any registered vehicles.' : userCars.map((car) => `${car.carName}  (\`${car.plateNumber}\`) (\`${car.vehicleColor}\`)`).join(`\n`) },
      );
  
      await interaction.reply({ embeds: [profileEmbed] });
    },
  };