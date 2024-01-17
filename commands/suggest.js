
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle , ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('suggest something related to server or sessions!')
        .addStringOption(option => option.setName('suggestion').setDescription('What side of the server are you trying to suggest?').setRequired(true).addChoices(
            { name: 'server', value: 'Server' },
            { name: 'sessions', value: 'Session' },

          )),
    async execute(interaction) {
        const Input1 = interaction.options.getString('suggestion');

        const modal = new ModalBuilder()
            .setTitle('Suggestion')
            .setCustomId(`app_${Input1}`);

        const nameInput = new TextInputBuilder()
            .setCustomId('name-input')
            .setLabel('What is your suggestion?')
            .setPlaceholder('Type your response here...')
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph);

        const emailInput = new TextInputBuilder()
            .setCustomId('email-input')
            .setLabel("How will this benefit the server?")
            .setPlaceholder('Type your response here...')
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph);

        // const departmentInput = new TextInputBuilder()
        //     .setCustomId('department-input')
        //     .setLabel('There has been a 3 vehicle accident')
        //     .setPlaceholder('List all the steps from beginning to end...')
        //     .setRequired(true)
        //     .setMaxLength(1000)
        //     .setMinLength(1)
        //     .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(emailInput);
     //       const thirdActionRow = new ActionRowBuilder().addComponents(departmentInput);
    
            modal.addComponents(firstActionRow, secondActionRow);
    
            // const result = await interaction.showModal(modal);
    
            // if (!result) {
            //     return await interaction.reply('Application cancelled.');
            // }
    

    
            
    
            // if (!channel) {
            //     return interaction.reply('Invalid channel');
            // }
    
            await interaction.showModal(modal);
        },
    };
