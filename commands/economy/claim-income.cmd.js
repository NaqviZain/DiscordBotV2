import { EmbedBuilder } from 'discord.js';
import { economy } from '../../data/mongodb.js';

/** @type {import("../bot.js").Command} */
export const data = {
  name: "collect-income",
  type: 1,
  description: "Collect role-based income",
  dm_permission: false,
  default_member_permissions: 0
};

const COOLDOWN_TIME = 6 * 60 * 60 * 1000; // 6 hours in ms

/**
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  await interaction.deferReply({ ephemeral: false });
  const ROLE_INCOMES = client.settings.income_roles;
  const userId = interaction.user.id;
  const now = Date.now();

  // Get or create the user's economy profile
  let profile = await economy.findOne({ userId });
  if (!profile) {
    profile = await economy.create({ userId, balance: 0, claimCooldown: null, claimCooldown: null });
  }

  // Check cooldown (only if claimCooldown is set)
  const lastClaim = profile.claimCooldown ? new Date(profile.claimCooldown).getTime() : 0;
  const timeSinceLastClaim = now - lastClaim;
  if (profile.claimCooldown && timeSinceLastClaim < COOLDOWN_TIME) {
    const timeRemaining = COOLDOWN_TIME - timeSinceLastClaim;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const embed = new EmbedBuilder()
      .setColor('#6c78fc')
      .setDescription(`⏳ You cannot collect income for another **${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}, and ${seconds} second${seconds !== 1 ? 's' : ''}**.`);

    return await interaction.editReply({ embeds: [embed] });
  }

  // Calculate total income from roles
  const userRoles = interaction.member.roles.cache;
  let totalIncome = 0;
  const collectedRoles = [];

  for (const [roleId, income] of Object.entries(ROLE_INCOMES)) {
    if (userRoles.has(roleId)) {
      const role = interaction.guild.roles.cache.get(roleId);
      totalIncome += income;
      collectedRoles.push({ roleName: role?.name || `Unknown Role (${roleId})`, income });
    }
  }

  // Update the profile
  profile.balance += totalIncome;
  profile.claimCooldown = now;
  await profile.save();

  // Format embed
  const embed = new EmbedBuilder()
    .setColor('#6c78fc')
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
    })
    .setFooter({
      text: 'Income Collection',
      iconURL: interaction.guild.iconURL({ dynamic: true })
    });

  let description = '✅ Role income successfully collected!\n\n';
  collectedRoles.forEach((collectedRole, index) => {
    const role = interaction.guild.roles.cache.find(role => role.name === collectedRole.roleName);
    const roleMention = role ? `<@&${role.id}>` : collectedRole.roleName;
    description += `${index + 1} - ${roleMention} | $${collectedRole.income.toLocaleString()}\n`;
  });

  embed.setDescription(description);

  await interaction.editReply({ embeds: [embed] });
}