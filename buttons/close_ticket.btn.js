import pkg from "discord-html-transcripts";
const discordTranscripts = pkg;
export const data = {
    name: 'close_ticket'
};
/**
 * @param {import("discord.js").ButtonInteraction<"cached">} int
 * @param {import("../bot").Bot} client
 */
export async function execute(int, client) {

    await int.deferReply({ ephemeral: true });

    const channel = client.channels.cache.get(client.settings.transcript_channel);
    if (!channel) return int.followUp({ content: "Transcript channel not found" });


    // Must be awaited

    
    const attachment = await discordTranscripts.createTranscript(int.channel);

    channel.send({
    files: [attachment],
    });

    await int.editReply({ content: 'Ticket closed'})
    await int.channel.delete();
    




};