let channelSugg = null;
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Intents, ActivityType, EmbedBuilder, Embed } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');
const { isLinkButton } = require('discord-api-types/utils/v10');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]});
const { Events, ModalBuilder } = require('discord.js');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	channelSugg = client.channels.cache.get("1041837347563642902");
	console.log('Ready!');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isAutocomplete()) return;
	// do autocomplete handling
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
      // command handling
    } else if (interaction.isAutocomplete()) {
      const command = client.commands.get(interaction.commandName);
  
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
  
      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  });


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, channelSugg);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



const wait = require('node:timers/promises').setTimeout;

client.on("interactionCreate", async interaction => {
    if (interaction.isButton()) {
        const customId = interaction.customId;
        const Input = customId.split("_")[1];
        const [staffValue, essValue] = customId.split("_").slice(1);


        if (customId.startsWith("Early")) {
            const buttonName = "Early"; // Name of the button
            const requiredRoleIDs = ["771562741348958209", "1028846489461588058"]; // ID of the required role

            const member = interaction.member;
            const roles = member.roles.cache;
            const hasRole = requiredRoleIDs.some(roleID => roles.has(roleID));

            if (hasRole) {
                await interaction.reply({ content: Input, ephemeral: true });

                const channel = client.channels.cache.get("769269871409233960");
                if (channel) {
                    const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                    const embed = new EmbedBuilder()
                        .setColor("#6c78fc")
                        .setTitle("Button Clicked")
                        .setDescription(`User ${interaction.user.username} clicked on button ${buttonName} with Input: ${Input}`);
                    channel.send({ embeds: [embed] });
                }
            } else {
                const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                await interaction.reply({ content: `You do not have any of the required roles (${requiredRoles}) to use this button.`, ephemeral: true });
            }
        }
        if (customId.startsWith("ESS")) {
            const buttonName1 = "Emergency Services"; // Name of the button
            const requiredRoleIDs = ["1025881376936964106", "1028846786447691809", "769269667730423838"]; // IDs of the required roles

            const member = interaction.member;
            const roles = member.roles.cache;
            const hasRole = requiredRoleIDs.some(roleID => roles.has(roleID));

            if (hasRole) {
                await interaction.reply({ content: Input, ephemeral: true });

                const channel = client.channels.cache.get("769269871409233960");
                if (channel) {
                    const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                    const embed = new EmbedBuilder()
                        .setColor("#6c78fc")
                        .setTitle("Button Clicked")
                        .setDescription(`User ${interaction.user.username} clicked on button ${buttonName1} with Input: ${Input}`);
                    channel.send({ embeds: [embed] });
                }
            } else {
                const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                await interaction.reply({ content: `You do not have any of the required roles (${requiredRoles}) to use this button.`, ephemeral: true });
            }
        }
        if (customId.startsWith("Link_")) {
            const buttonName4 = "Session Link"; // Name of the button
            const requiredRoleIDs = ["1028845091881766922"]; // IDs of the required roles

            const member = interaction.member;
            const roles = member.roles.cache;
            const hasRole = requiredRoleIDs.some(roleID => roles.has(roleID));
            

            if (hasRole) {
                await interaction.reply({ content: Input, ephemeral: true });

                const channel = client.channels.cache.get("769269871409233960");
                if (channel) {
                    const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                    const embed = new EmbedBuilder()
                        .setColor("#6c78fc")
                        .setTitle("Button Clicked")
                        .setDescription(`User ${interaction.user.username} clicked on button ${buttonName4} with Input: ${Input}`);
                    channel.send({ embeds: [embed] });
                }
            } else {
                const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                await interaction.reply({ content: `You do not have any of the required roles (${requiredRoles}) to use this button.`, ephemeral: true });
            }
        }	
        if (customId.startsWith("re_")) {
            const buttonName4 = "re-invites"; // Name of the button
            const requiredRoleIDs = ["1028845091881766922"]; // IDs of the required roles

            const member = interaction.member;
            const roles = member.roles.cache;
            const hasRole = requiredRoleIDs.some(roleID => roles.has(roleID));

            if (hasRole) {
                await interaction.reply({ content: Input, ephemeral: true });

                const channel = client.channels.cache.get("769269871409233960");
                if (channel) {
                    const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                    const embed = new EmbedBuilder()
                        .setColor("#6c78fc")
                        .setTitle("Button Clicked")
                        .setDescription(`User ${interaction.user.username} clicked on button ${buttonName4} with Input: ${Input}`);
                    channel.send({ embeds: [embed] });
                }
            } else {
                const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                await interaction.reply({ content: `You do not have any of the required roles (${requiredRoles}) to use this button.`, ephemeral: true });
            }
        }	
		
        if (customId.startsWith("SessionInformation_")) {
            const buttonName4 = "SessionInformation"; // Name of the button
            const requiredRoleIDs = ["1028845091881766922"]; // IDs of the required roles

            const member = interaction.member;
            const roles = member.roles.cache;
            const hasRole = requiredRoleIDs.some(roleID => roles.has(roleID));
			const embed9 = new EmbedBuilder()
			.setColor(`#6c78fc`)
			.setTitle('**Session Information**')
			.setDescription(`\nBelow is some additional information regarding the released session\n\n> Additional Active Staff: **${staffValue}** \n> Emergency Services: **${essValue}**`)

            if (hasRole) {
                await interaction.reply({embeds: [embed9], ephemeral: true });
                const channel = client.channels.cache.get("769269871409233960");
                if (channel) {
                    const requiredRoles = requiredRoleIDs.map(roleID => interaction.guild.roles.cache.get(roleID).toString()).join(" or ");
                    const embed = new EmbedBuilder()
                        .setColor("#6c78fc")
                        .setTitle("Button Clicked")
                        .setDescription(`User ${interaction.user.username} clicked on button ${buttonName4} with Input: ${Input}`);
						channel.send({ embeds: [embed], ephemeral: true });
                }
            }
        }	

    }
	
});


client.on('interactionCreate', async interaction => {
	if (interaction.isSelectMenu()) {
		if (interaction.customId === `select`)
		options = interaction.values[0]

		if (options === `first_option`) {
			const embed1 = new EmbedBuilder()
			.setColor(`#c00000`)
			.setTitle('Banned Vehicles & Guns')
			.setDescription('Vehicles that are prohibited from being used during sessions without proper roles will be found here.\n\n \`Banned Cars:`\ \n\n \`Banned Guns:`\ ')
			.setThumbnail(`https://cdn.discordapp.com/attachments/1177281870635999252/1180330462745481297/9e851851034343f7.png?ex=657d0767&is=656a9267&hm=0f62a0a8de38ece6c3b03629daab61f7a5a523d8853ea00bbdf4e4138d8231f2&`)
			.setTimestamp()
			await interaction.reply({ ephemeral: true,embeds: [embed1]});
		} else if (options === `second_option`) {
			const embed2 = new EmbedBuilder()
			.setColor(`#c00000`)
			.setTitle('Roleplay Information')
			.setDescription(`Roleplay Information can be found in; <#1177281805028692060>`)
			.setThumbnail(`https://cdn.discordapp.com/attachments/1177281870635999252/1180330462745481297/9e851851034343f7.png?ex=657d0767&is=656a9267&hm=0f62a0a8de38ece6c3b03629daab61f7a5a523d8853ea00bbdf4e4138d8231f2&`)
			await interaction.reply({ ephemeral: true,embeds: [embed2]});			

		} 
        //else if (options === `third_option`) {
		// 	const embed3 = new EmbedBuilder()
		// 	.setColor(`#00FF00`)
		// 	.setTitle('Roleplay Information')
		// 	.setURL('https://cdn.discordapp.com/avatars/778042620307177492/d508b01cd077412a0471f034473667fb.webp')
		// 	.setDescription("**__Banned Roleplays:__**\n\n➥ Drug roleplays. \n➥ Gang roleplays. \n➥ Suicidal roleplays. \n➥ Public massacre (shooting) RolePlays.\n➥ “lynching” roleplays.\n➥ Gore roleplays\n➥ Protest roleplays.\n\n **__When Peacetime is enabled you may not:__**\n\n➥ Go over the speed limit of __80 MPH. __\n➥ Fail RolePlay of any kind (For example, flipping over and driving off as if it didn’t occur).\n➥ Run from FMPD __(Fort Myers Police Department).__\n➥ Hit and run (you must exchange).\n➥ Drift unless you are on private property. Failure to obey, will be a warn. \n➥ __Majorly reckless__ drive (Such as driving on the opposite side of the road, intentionally cutting off/desyncing civilians, and etc).\n➥ Commit  major __criminal acts.__ This involves robbing, running red lights, major violence, and guns/shooting.\n\n**__When Peacetime Disabled you may not:__** \n\n➥ Go over __100 MPH.__ \n➥ Fail RolePlay of any kind (For example, flipping over and driving off as if it didn’t occur).\n➥ Commit major crimes without __priority.__")
		// 	.setThumbnail(`https://cdn.discordapp.com/attachments/895106174968553522/1004474913714880522/sfrg_logo_fixed.png`)
		// 	.setTimestamp()
		// 	.setFooter({ text: 'Southwest Florida Roleplay Group', iconURL: 'https://cdn.discordapp.com/attachments/781929673282158612/961633408520446013/sfrg_logo_fixed.png' });
		// 	await interaction.reply({ ephemeral: true,embeds: [embed3]});					
		// } 
	}

}),


client.on(Events.InteractionCreate, interaction => {
    const channel = interaction.guild.channels.cache.get('1180331548118102096');
	if (!interaction.isModalSubmit()) return;
    if (!channel) {
        console.log('Channel not found.');
        return;
    }

    const name = interaction.fields.getTextInputValue(`name-input`);
    const email = interaction.fields.getTextInputValue(`email-input`);
    const customId = interaction.customId;
    const Input1 = customId.split("_")[1];

    const embed = new EmbedBuilder()
                        .setColor("#c00000")
                        .setTitle(`Suggestion [${Input1}]`)
                        .setDescription(`\n\**What is your suggestion?**: ${name}\n**How will this benefit the server?:** ${email}\n\n Submitted By; ${interaction.user.tag}`)
                        .setThumbnail(interaction.user.avatarURL());
                        channel.send({ embeds: [embed], ephemeral: true })
                        .then(sentMessage => {
                          sentMessage.react('✅'); 
                          sentMessage.react('❌'); 
                        })
                        .catch(console.error);
                        
    const embed1 = new EmbedBuilder()
    .setColor("#c00000")
    .setTitle(`Suggestion Submitted!`)
    .setDescription(`View your suggestion in ${channel}!`);
    if (!interaction.replied && !interaction.deferred) {
        interaction.reply({ embeds: [embed1], ephemeral: true });
      }

});

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('activity', { type: ActivityType.Watching });
    client.user.setPresence({ activities: [{ name: 'discord.gg/tampaa' }], status: 'online' });
 });




const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId} = require('./config.json');

const commands = [];


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


client.login(token);