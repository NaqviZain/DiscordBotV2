import { spawn } from "node:child_process"; 
/** @type {import("../../bot.js").Command} */
export const data = {
    name: "pull",
    type: 1,
    description: "Pull & Restart",
    dm_permission: false,
    default_member_permissions: 0
  };
  
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
   * @param {import("../../bot.js").Bot} client
   */
  export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: false });
    if (interaction.member.id != "539213950688952320") {
      return interaction.reply({
        content: "You do not have the proper permissions to use this command.",
        ephemeral: true
      });
    }

    try {
        const command = "git pull origin main && npm install && pm2 restart index";
        command.stdout.on('data', output => {
            // the output data is captured and printed in the callback
            console.log("Output: ", output.toString())
        })
    } catch (e) {
        console.log(e); 
        return interaction.reply({
            content: `Error while pulling & restarting`,
            ephemeral: false
          });
    }
  }