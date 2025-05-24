import { jailed, strikes } from "../data/mongodb.js";

/** @type {import("../bot.js").Event} */
export const data = {
  name: "guildMemberAdd",
  once: false,
};

/**
 * @param {import("discord.js").GuildMember} member
 */
export async function execute(member) {
  setTimeout(async () => {
    try {
      const jailedEntry = await jailed.findOne({ userId: member.id });
      const strikeEntry = await strikes.findOne({ userId: member.id });

      // ✅ If jailed, override all roles with Jailed
      if (jailedEntry) {
        await member.roles.set([member.client.settings.Jailed]);

        const jailLog = [
          {
            title: "Auto-Jail Triggered",
            description: `${member.user} has rejoined and was automatically re-jailed.\n> User ID: \`${member.id}\`\n> Reason: **Previously jailed**`,
            color: 0xff0000,
            footer: {
              text: "Centreville Auto-Moderation",
              icon_url: member.guild.iconURL({ dynamic: true }),
            },
          },
        ];

        const logChannel = await member.client.channels.fetch(member.client.settings.log_channel);
        if (logChannel) await logChannel.send({ embeds: jailLog });

        console.log(`[Auto-Jail] ${member.user.tag} was re-jailed.`);
        return;
      }

      // ✅ If user had strike roles, reassign them without removing existing roles
      if (strikeEntry && strikeEntry.strikes.length > 0) {
        for (const roleId of strikeEntry.strikes) {
          if (!member.roles.cache.has(roleId)) {
            await member.roles.add(roleId).catch(() => {});
          }
        }

        const strikeLog = [
          {
            title: "Auto-Strike Triggered",
            description: `${member.user} has rejoined and had their strike roles restored.\n> Roles: ${strikeEntry.strikes.map(r => `<@&${r}>`).join(", ")}`,
            color: 0xff9900,
            footer: {
              text: "Centreville Auto-Moderation",
              icon_url: member.guild.iconURL({ dynamic: true }),
            },
          },
        ];

        const logChannel = await member.client.channels.fetch(member.client.settings.log_channel);
        if (logChannel) await logChannel.send({ embeds: strikeLog });

        console.log(`[Auto-Strike] ${member.user.tag} had strike roles reapplied.`);
      }
    } catch (err) {
      console.error(`[AutoJoinError] ${member.user?.tag || member.id}:`, err);
    }
  }, 25 * 1000);
}
