/**@type {import("../bot.js").Button} */
export const data = {
  name: "early_access",
};
/**
 *
 * @param {import("discord.js").ButtonInteraction<'cached'>} int
 * @param {import("../bot.js").Bot} client
 */
export async function execute(int, client) {
  const eaRoles = [1207328977379663902];
  const roles = int.member.roles.cache
  
  const resp = int.message.embeds[1];
  int.reply({embeds:[resp], ephemeral:true})
}
