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
        staff_role: `1355939357273358467`,
        support: `1355939357273358467`,
        admin_role: `1355939356069597353`,
        support_category: `1361082463710875839`,
        staff_report_category: `1374548918578450482`,
        transcript_channel: `1323890715683459093`,
        rto_ping: `1374477831005929692`,
        log_channel: `1342894245656395858`,
        ps_roles: [
            { id: '1374490564137062450', name: 'WSP' },
            { id: '1374490615965945977', name: 'OCSO' },
            { id: '1374490650770411641', name: 'FD' }
        ],
        role_request_channel: `1369409536846331914`,
        role_request: `1355939356069597353`
    };
    await client.init();
})();
