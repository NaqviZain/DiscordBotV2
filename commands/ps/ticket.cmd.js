import { vehicle, ticket } from "../../data/mongodb.js";

const choices = {
    "(1)01": 1000,
    "(1)02": 500,
    "(1)03": 1000,
    "(1)04": 1500,
    "(1)05": 1500,
    "(1)06": 500,
    "(1)07": 1000,
    "(1)08": 2000,
    "(1)10": 3000,
    "(1)11": 1500,
    "(1)12": 1500,
    "(1)13": 3000,
    "(1)14": 2500,
    "(1)15": 1000,
    "(1)16": 1500,
    "(1)17": 500,
    "(1)18": 1000,
    "(1)19": 500,
    "(1)20": 6000,
    "(1)21": 3000,
    "(1)22": 1000,
    "(2)01": 1000,
    "(2)02": 2000,
    "(2)03": 2500,
    "(2)04": 1500,
    "(2)05": 500,
    "(2)06": 1000,
    "(2)07": 1000,
    "(2)08": 1500,
    "(2)09": 1000,
    "(2)10": 1000,
    "(2)11": 500,
    "(2)12": 1000,
    "(2)13": 1000,
    "(2)14": 1000,
    "(2)15": 1500,
    "(2)16": 1000,
    "(2)17": 1000,
    "(2)18": 1000,
    "(2)19": 500,
    "(2)20": 1000,
    "(2)21": 1500,
    "(2)22": 2500,
    "(2)23": 1000,
    "(2)24": 250,
    "(2)25": 750,
    "(2)26": 1250,
    "(2)27": 1500,
    "(3)01": 2000,
    "(3)02": 1000,
    "(3)03": 750,
    "(3)04": 1000,
    "(3)05": 500,
    "(3)06": 500,
    "(3)07": 450,
    "(3)08": 750,
    "(3)09": 750,
    "(3)10": 350,
    "(3)11": 50000,
    "(3)12": 300,
    "(3)13": 2000,
    "(3)14": 750,
    "(3)15": 500,
    "(3)16": 500,
    "(3)17": 1000,
    "(3)18": 1000,
    "(4)01": 0,
    "(4)02": 500,
    "(4)03": 500,
    "(4)04": 500,
    "(4)05": 0,
    "(4)06": 750,
    "(4)07": 500,
    "(5)01": 0,
    "(5)02": 250,
    "(5)03": 500,
    "(5)04": 1000,
    "(5)05": 0,
    "(5)06": 650,
    "(5)07": 0,
    "(5)08": 550,
    "(5)09": 0,
    "(5)10": 500,
    "(6)01": 500,
    "(6)02": 1500,
    "(6)03": 1000,
    "(6)04": 250,
    "(6)05": 500,
    "(6)06": 1000,
    "(6)07": 5000,
    "(6)08": 300,
    "(6)09": 600,
    "(6)10": 800,
    "(6)11": 1000,
    "(6)12": 500,
    "(6)14": 250,
    "(6)15": 500,
    "(6)16": 250,
    "(6)17": 500,
    "(6)18": 250,
    "(6)19": 750,
    "(6)20": 500,
    "(6)21": 250,
    "(6)22": 750,
    "(6)23": 1000,
    "(6)24": 2000,
    "(6)25": 500,
    "(6)26": 250,
    "(6)27": 1000,
    "(6)28": 1000,
    "(6)29": 250,
    "(6)30": 250,
    "(6)31": 500,
    "(6)32": 500,
    "(6)33": 500,
    "(6)34": 500,
    "(6)35": 250,
    "(6)36": 500,
    "(6)37": 1000,
    "(6)38": 500,
    "(6)39": 500,
    "(6)40": 750,
    "(6)41": 500,
    "(6)42": 500,
    "(6)43": 250,
    "(6)44": 250,
    "(6)45": 750,
    "(6)46": 250,
    "(6)47": 500,
    "(6)48": 500,
    "(6)49": 1000,
    "(6)50": 250,
    "(6)51": 5000,
    "(6)52": 250,
    "(6)53": 500,
    "(7)01": 1500,
    "(7)02": 500,
    "(7)03": 1000,
    "(7)04": 750,
    "(7)05": 1250,
    "(7)06": 500,
    "(7)07": 0,
    "(7)08": 1000,
    "(7)09": 250,
    "(7)10": 500,
    "(7)11": 150,
    "(8)01": 500,
    "(8)02": 1000,
    "(8)03": 1500,
    "(8)04": 2500,
    "(8)05": 2500,
    "(8)06": 1500,
    "(8)07": 3500,
    "(8)08": 1000,
    "(8)09": 1500,
    "(8)10": 2500,
    "(8)11": 500,
};


/**@type {import("../bot.js").Command} */
export const data = {
    name: "ticket",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "ticket a user",
    options: [
        {
            type: 6,
            name: "user",
            description: "What user",
            required: true,
            autocomplete: false,
        },
        {
            type: 3,
            name: "charge1",
            description: "What charges",
            required: true,
            autocomplete: true,
        },
        {
            type: 3,
            name: "charge2",
            description: "What charges",
            required: false,
            autocomplete: true,
        },
        {
            type: 3,
            name: "charge3",
            description: "What charges",
            required: false,
            autocomplete: true,
        },
        {
            type: 3,
            name: "charge4",
            description: "What charges",
            required: false,
            autocomplete: true,
        },
        {
            type: 3,
            name: "charge5",
            description: "What charges",
            required: false,
            autocomplete: true,
        },
        {
            type: 3,
            name: "charge6",
            description: "What charges",
            required: false,
            autocomplete: true,
        }
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
    const psRoleIds = client.settings.ps_roles.map(r => r.id);
    const hasPsRole = interaction.member.roles.cache.some(role => psRoleIds.includes(role.id));
    if (!hasPsRole) {
        return await interaction.editReply({
            content: "You do not have permission to use this command. If you are a LEO this means you do not have the ``Emergency Services`` role.",
            ephemeral: true
        });
    }
    const user = interaction.options.get("user").user;
    if (user.bot) {
        return interaction.editReply({
            content: "You cannot ticket a bot.",
        });
    }
    const officer = interaction.user.id;
    let chargesArr = [
        interaction.options.getString("charge1", true),
        interaction.options.getString("charge2", false),
        interaction.options.getString("charge3", false),
        interaction.options.getString("charge4", false),
        interaction.options.getString("charge5", false),
        interaction.options.getString("charge6", false)
    ].filter(Boolean); // removes undefined/null/empty
    let charges = chargesArr.join("\n");
    let chargesInline = chargesArr.join(", ");


    const fine = choices[interaction.options.getString("charge1", true)] + (choices[interaction.options.getString("charge2", false)] || 0) + (choices[interaction.options.getString("charge3", false)] || 0) + (choices[interaction.options.getString("charge4", false)] || 0) + (choices[interaction.options.getString("charge5", false)] || 0) + (choices[interaction.options.getString("charge6", false)] || 0);

    const count = await ticket.countDocuments({})
    const report_num = Math.floor(Math.random() * 100000) + count
    const ticket_save = new ticket({
        recipient: user.id,
        officer: `<@${officer}>`,
        charges: charges,
        fine: fine,
        case: count + 1,
        report_num: report_num,
    });
    await ticket_save.save();
    await interaction.editReply({
        content: `Ticketed ${user.username} for ${chargesInline} with a fine of $${fine}.`,
        ephemeral: true,
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    try {
        /**@type {import("discord.js").APIEmbed[]} */
        var response = [
            {
                title: `TRAFFIC CITATION`,
                description: `
                **Report #**: ${year}${month}${day}${Math.floor(Math.random() * 630) + count}

                > Violater: <@${user.id}>
                > Citation Date: <t:${Math.floor(Date.now() / 1000)}:D>
                > Citation Time : <t:${Math.floor(Date.now() / 1000)}:T>
                \n
                ${chargesArr.map(c => `> ${c}`).join('\n')}
                > 
                > Total Fine: $${fine}
                > Officer: <@${officer}>
                `,
                color: client.settings.color,
                thumbnail: {
                    url: 'https://media.discordapp.net/attachments/1372686388398395593/1372687039698567288/outagamie1-logo.png?ex=682e456d&is=682cf3ed&hm=2e49a9178066a2688894224c0e32492149d1857f1bc53fd6923c978b58ef1d41&=&format=webp&quality=lossless'
                }
            },
        ];
        await user.send({
            embeds: response
        });
    } catch (error) { }

    const channel = await client.channels.fetch(client.settings.ps_ticket_logs);
    if (!channel) return await interaction.editReply({ content: "Ticket log channel not found", ephemeral: true });
    channel.send({
        embeds: response
    })
}


export async function autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choicesArray = Object.keys(choices);
    const filtered = choicesArray.filter((choice) => choice.toLowerCase().includes(focusedValue.toLowerCase()))
        .slice(0, 25); // Limit results to 25 choices
    await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice }))
    );
}