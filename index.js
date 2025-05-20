import { Collection } from "discord.js";
import { Bot } from "./bot.js";
import { config } from "dotenv";
config();
//process.on("uncaughtException", (e) => console.log("[ UNCAUGHT EXCEPTION ] →", e));
//process.on("unhandledRejection", (e) => console.log("[ UNHANDLED REJECTION ] →"), e);
(async () => {
    const client = new Bot({
        intents: 3276799, // ALL intents via - https://discord-intents-calculator.vercel.app/
    });
    client.settings = {
        color: 0x121212, // put color hex here for embeds n shit wo #
        iconURL: '',
        staff_role: `1374180587882938398`,
        support: `1374181526450737223`,
        admin_role: `1374111998802923720`,
        support_category: `1374181495983312908`,
        staff_report_category: `1374378264474419270`,
        transcript_channel: `1374394092993122304`
    };
    await client.init();
})();
