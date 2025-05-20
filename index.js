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
        transcript_channel: `1374394092993122304`,
        rto_ping: `1374477831005929692`,
        log_channel: `1374480953073991700`,
        ps_roles: [
            { id: '1374490564137062450', name: 'WSP' },
            { id: '1374490615965945977', name: 'OCSO' },
            { id: '1374490650770411641', name: 'FD' }
        ],
        role_request_channel: `1374494055475707934`,
        role_request: `1374495147340992626`
    };
    await client.init();
})();
