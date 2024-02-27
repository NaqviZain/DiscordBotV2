export const data = {
  name: "interactionCreate",
};
/**
 * @param {import("discord.js").ChatInputCommandInteraction<"cached">|import("discord.js").ButtonInteraction<"cached">|import("discord.js").AutocompleteInteraction<"cached">|import("discord.js").SelectMenuInteraction<"cached">|import("discord.js").ModalSubmitInteraction<"cached">|import("discord.js").MessageContextMenuCommandInteraction<"cached">|import("discord.js").UserContextMenuCommandInteraction} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  if (interaction.isCommand()) {
    const command = client.cmds.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      let pick = 0;
      const options = ["reply", "editReply"];
      if (interaction.replied || interaction.deferred) pick = 1;
      await interaction[options[pick]]({
        content: "There was an error while executing this command!",
      });
    }

    try{
      
    const channel = client.channels.cache.get(client.settings.log_channel); // get the channel from the ca
    const optionsData = interaction.options.data || [];

// Construct options list string
    let optionsList = "";
    optionsData.forEach(option => {
      // Check if the option is a user
      if (option.type === 'USER') {
        optionsList += `${option.name}: <@${option.value}>\n`;
      } else {
        optionsList += `${option.name}: ${option.value}\n`;
      }
    });

    const response = [
      {
        title: "Command Used",
        description: `**Command:** ${interaction.commandName}\n**User:** ${interaction.user}\n**Options:**\n${optionsList}**Date:** ${new Date().toLocaleString()}`,
      }
    ]
    channel.send({ embeds: response})
  } catch (error) {
    console.log("Logging failed.\n" + error);
  }

  } else if (interaction.isButton()) {
    let button =
      client.buttons.get(interaction.customId) ||
      (client.settings.departments.has(interaction.customId)
        ? client.buttons.get("role_link")
        : undefined);

    if (!button) return;
    try {
      await button.execute(interaction, client);
    } catch (error) {
      console.error(error);
    }
  } else if (interaction.isAutocomplete()) {
    const command = client.cmds.get(interaction.commandName);
    if (!command) return;
    try {
      await command.autocomplete(interaction, client);
    } catch (error) {
      console.error(error);
    }
  } else if (interaction.isStringSelectMenu()) {
    let selectMenu = client.selectMenus.get(interaction.customId);

    if (!selectMenu) return;
    try {
      await selectMenu.execute(interaction, client);
    } catch (error) {
      console.log(error);
    }
  } else if (interaction.isUserContextMenuCommand()) {
    if (!interaction.isUserContextMenuCommand()) return;
    console.log(interaction);
  } else if (interaction.isMessageContextMenuCommand()) {
    if (!interaction.isMessageContextMenuCommand()) return;
    console.log(interaction);
  } else if (interaction.isModalSubmit()) {
    console.log(interaction); // data needs to be put here for modal submits
  }
}
