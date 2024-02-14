import { Vehicle } from "../../data/mongodb.js";
/**@type {import("../../bot.js").Command} */
export const data = {
    name: "register",
    type: 1,
    description: "Register a Vehicle",
    options: [
        {
            type: 4, // INTEGER Type
            name: "vehicle",
            description: "Select a Vehicle from Below: ",
            required: true,
            autocomplete: true
        },
        {
            type: 4, // INTEGER Type
            name: "color",
            description: "Select the Color of your Vehicle",
            required: true,
            autocomplete: true
        },
        {
            type: 3, // STRING Type
            name: "license-plate",
            description: "Put your License Plate for your in-game vehicle",
            required: true,
            min_length: 1,
            max_length: 7
        },
    ],
    dm_permission: false,
};
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const moreCarsRoleId = "1203078168282406912"; // put role that'll have more access to vehicles
    if (!moreCarsRoleId) return await interaction.editReply({ content: "CHECK CONFIGURATION: No valid role ID for Role Checker" });

    const moreCarsRole = interaction.guild.roles.cache.get(moreCarsRoleId);

    const hasRole = interaction.member.roles.cache.has(moreCarsRoleId);

    const uVehicles = await Vehicle.find({ ownerId: interaction.user.id });

    if (!hasRole && uVehicles.length >= client.settings.vehicleLimits.regular) {
        return await interaction.editReply({ content: `You have reached the maximum vehicle limit of ${client.settings.vehicleLimits.regular} vehicles` });
    } else if (hasRole && uVehicles.length >= client.settings.vehicleLimits.special) {
        return await interaction.editReply({ content: `Users with ${moreCarsRole} can only register up to a max of ${client.settings.vehicleLimits.special} Vehicles` });
    }

    const vehicle = interaction.options.getInteger("vehicle", true);
    let licensePlate = interaction.options.getString("license-plate", true);
    let color = interaction.options.getInteger("color", true);

    licensePlate = licensePlate.toUpperCase();

    if (client.settings.vehicleColors.length - 1 < color || color < 0) {
        return await interaction.editReply({ content: "Vehicle Color you have selected is NOT allowed" });
    }
    if (client.settings.vehicles.length - 1 < color || vehicle < 0) {
        return await interaction.editReply({ content: "The Vehicle you selected is NOT allowed" });
    }

    try {
        const v = new Vehicle({
            vehicle: vehicle,
            ownerId: interaction.user.id,
            licensePlate: licensePlate,
            color: color,
        });

        await v.save();
        await interaction.editReply({ content: `Your ${client.settings.vehicleColors[color].name} ${client.settings.vehicles[vehicle].name} was successfully registered!` });
    } catch (error) {
        console.error("An error has occurred while trying to register a Vehicle:", error);
        await interaction.editReply({ content: "An error occurred while trying to register the vehicle you have selected" });
    }

};

import fuzzysort from "fuzzysort";

/**
 * This function is executed when autocomplete is triggered
 * @param {import("discord.js").AutocompleteInteraction<'cached'>} interaction
 * @param {import("../../bot.js").Bot} client
 */
export async function autocomplete(interaction, client) {
    const focused = interaction.options.getFocused(true);
    /**@type {{name: string, value: number}[]} */
    let data = [];
    switch (focused.name) {
        case "vehicle":
            data = client.settings.vehicles; // gonna be added in a bit
            break;
        case "color":
            data = client.settings.vehicleColors;
            break;
    }
    const result = fuzzysort
        .go(focused.value, data, {
            limit: 25,
            keys: ["name"],
            all: true
        })
        .flatMap((r) => r.obj);
    await interaction.respond(result);
};