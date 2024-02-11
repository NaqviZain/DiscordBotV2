/**@type {import("../../bot.js").Button} */
export const data = {
  name: "registered_vehicles",
};
/**
 *
 * @param {import("discord.js").ButtonInteraction<'cached'>} int
 * @param {import("../../bot.js").Bot} client
 */
export async function execute(int, client) {
  int.reply({ content: "waiting bc idk how to pass info", ephemeral: true });
}
