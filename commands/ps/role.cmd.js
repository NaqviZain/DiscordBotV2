import { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
    name: "role",
    type: 1,
    description: "Add or remove a role from a user",
    options: [
        {
            type: 1, // SUB_COMMAND
            name: "add",
            description: "Add a role to a user",
            options: [
                {
                    type: 6, // USER
                    name: "user",
                    description: "The user to add the role to",
                    required: true,
                },

            ],
        },
        {
            type: 1, // SUB_COMMAND
            name: "remove",
            description: "Remove a role from a user",
            options: [
                {
                    type: 6, // USER
                    name: "user",
                    description: "The user to remove the role from",
                    required: true,
                },
            ],
        },
    ],
    dm_permission: false,
    default_member_permissions: 0,
};

/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });


    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case "add":
            await handleAdd(interaction, client);
            break;
        case "remove":
            await handleRemove(interaction, client);
            break;
        default:
            await interaction.editReply({ content: "Unknown subcommand." });
    }
}

async function handleAdd(interaction, client) {
    var embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setDescription("Please select a role to add to the user")
        .setTitle("Role Selection")
        .setFooter({ text: "This will time out in 30 seconds" });
    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("role_select")
                .setPlaceholder("Select a role")
                .setMinValues(1)
                .setMaxValues(client.settings.ps_roles.length)
                .addOptions(
                    client.settings.ps_roles.map((role) => ({
                        label: role.name,
                        value: role.id,
                        description: `Add ${role.name} role`,
                    })),
                ),
        );

    await interaction.editReply({
        embeds: [embed],
        components: [row],

    });
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 30000,
    });
    collector.on("collect", async (i) => {
        if (i.customId === "role_select") {
            const role = i.values;
            console.log(role);
            var embed = new EmbedBuilder()
                .setTitle('Role Request')
                .addFields(
                    {
                        name: "User",
                        value: `<@${interaction.options.getUser("user").id}>`,
                    },
                    {
                        name: "Roles to Add",
                        value: role.map((r) => `<@&${r}>`).join(", "),
                    },
                )
                .setFooter({ text: 'Requested by ' + interaction.user.username })
                .setColor(Colors.Greyple)

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("role_accept_add")
                        .setLabel("Accept")
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId("role_decline")
                        .setLabel("Decline")
                        .setStyle(ButtonStyle.Danger),
                );
            const request_channel = await client.channels.fetch(client.settings.role_request_channel);
            if (!request_channel) return await interaction.editReply({ content: "Role request channel not found", ephemeral: true });
            await request_channel.send({
                embeds: [embed],
                components: [button],
            });
            await i.update({
                content: "Role request sent",
                embeds: [],
                components: [],
            });

            collector.stop();
        }
    });


}

async function handleRemove(interaction, client) {

    var embed = new EmbedBuilder()
        .setColor(client.settings.color)
        .setDescription("Please select a role to remove from the user")
        .setTitle("Role Selection")
        .setFooter({ text: "This will time out in 30 seconds" });
    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("role_select")
                .setPlaceholder("Select a role")
                .setMinValues(1)
                .setMaxValues(client.settings.ps_roles.length)
                .addOptions(
                    client.settings.ps_roles.map((role) => ({
                        label: role.name,
                        value: role.id,
                        description: `Add ${role.name} role`,
                    })),
                ),
        );

    await interaction.editReply({
        embeds: [embed],
        components: [row],

    });
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 30000,
    });
    collector.on("collect", async (i) => {
        if (i.customId === "role_select") {
            const role = i.values;
            console.log(role);
            var embed = new EmbedBuilder()
                .setTitle('Role Request')
                .addFields(
                    {
                        name: "User",
                        value: `<@${interaction.options.getUser("user").id}>`,
                    },
                    {
                        name: "Roles to Remove",
                        value: role.map((r) => `<@&${r}>`).join(", "),
                    },
                )
                .setFooter({ text: 'Requested by ' + interaction.user.username })
                .setColor(Colors.Greyple)

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("role_accept_remove")
                        .setLabel("Accept")
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId("role_decline")
                        .setLabel("Decline")
                        .setStyle(ButtonStyle.Danger),
                );
            const request_channel = await client.channels.fetch(client.settings.role_request_channel);
            if (!request_channel) return await interaction.editReply({ content: "Role request channel not found", ephemeral: true });
            await request_channel.send({
                embeds: [embed],
                components: [button],
            });
            await i.update({
                content: "Role request sent",
                embeds: [],
                components: [],
            });

            collector.stop();
        }
    });


}