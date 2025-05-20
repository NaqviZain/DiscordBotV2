import { ButtonBuilder, EmbedBuilder , ActionRowBuilder, ButtonStyle} from "discord.js";

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

   

  } else if (interaction.isButton()) {
    let button =
      client.buttons.get(interaction.customId) 
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
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId == "ticket_modalsupport") {
      const embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setTitle("Support Ticket")
        .setTimestamp();
      const description = interaction.fields.getTextInputValue("ticket_input_description");
      embed.addFields({
        name: "Description",
        value: description,
      });

      // create channel 
      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        parent: client.settings.support_category,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"],
          },
          {
            id: interaction.user.id,
            allow: ["ViewChannel"],
          },
          {
            id: client.settings.staff_role,
            allow: ["ViewChannel"],
          }
        ],
      });

      const close_button = new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("Close Ticket")
        .setStyle(3)
        .setEmoji("🔒");

      const claim_button = new ButtonBuilder()
        .setCustomId("ticket_claim")
        .setLabel("Claim Ticket")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🔒")
        ;
      

      await channel.send({
        content: `<@${interaction.user.id}>`,
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(close_button, claim_button)],
        
      });
      await interaction.reply({
        content: `Ticket created <#${channel.id}>`,
        ephemeral: true,
      });
    }
  if (interaction.customId == "ticket_modalstaff_support") {
      const embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setTitle("Staff Report Ticket")
        .setTimestamp();
      const user_id = interaction.fields.getTextInputValue("ticket_input_user_id");
      const reason = interaction.fields.getTextInputValue("ticket_input_reason");
      embed.addFields({
        name: "User ID",
        value: user_id,
      });
      embed.addFields({
        name: "Reason",
        value: reason,
      });


      // create channel 
      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        parent: client.settings.staff_report_category,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"],
          },
          {
            id: interaction.user.id,
            allow: ["ViewChannel"],
          },
        ],
      });

      const close_button = new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("Close Ticket")
        .setStyle(3)
        .setEmoji("🔒");

      

      await channel.send({
        content: `<@${interaction.user.id}>`,
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(close_button)],
      });
      await interaction.reply({
        content: `Ticket created <#${channel.id}>`,
        ephemeral: true,
      });
    }
  }
}
