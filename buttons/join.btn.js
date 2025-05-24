import { startupSessions } from "../data/mongodb.js";

/** @type {import("discord.js").ButtonInteraction<"cached">} */
export const data = {
  name: "join"
};

export async function execute(interaction, client) {
  const session = await startupSessions.findOne().sort({ createdAt: -1 });

  if (!session || !session.reactions.includes(interaction.user.id)) {
    return interaction.reply({
      content: "You must react to the startup message first to join the session.",
      ephemeral: true
    });
  }

  const link = client.startupOneLink;

  if (!link) {
    return interaction.reply({
      content: "The session link is not set yet.",
      ephemeral: true
    });
  }

  return interaction.reply({
    content: link,
    ephemeral: true
  });
}
