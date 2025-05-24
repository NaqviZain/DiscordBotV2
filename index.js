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
        color: 0x95a5a6, // put color hex here for embeds n shit wo #
        iconURL: '',
        staff_role: `1355939357273358467`,
        startup_channel: `1323890664550961152`,
        early_channel: `1341217220981690378`,
        support: `1355933066069283006`,
        admin_role: `1355939356069597353`,
        support_category: `1361082463710875839`,
        staff_report_category: `1374548918578450482`,
        transcript_channel: `1323890715683459093`,
        rto_ping: ``,
        log_channel: `1374941313740443729`,
        strike1: `1355940153671286794`,
        strike2: `1355940153973018664`,
        strike3: `1355940155009007666`,
                Jailed: `1374934936427167764`,

        ps_roles: [
            { id: '1355939359957717050', name: 'WSP' },
            { id: '1355940150823092295', name: 'OCSO' },
            { id: '1355940150999253182', name: 'FD' },
            { id: '1374129668382523522', name: 'NPS' }, 
            { id: '1355940151871930368', name: 'NPS' },
        ],
        role_request_channel: `1369409536846331914`,
        role_request: `1373450361754615869`,
        ps_ticket_logs: `1345445630067081407`,
        income_roles: {
            '1374129668382523522': 300, //NPS
            '1355939359957717050': 300, //WSP
            '1355940150823092295': 300, //OCSO
            '1355940150999253182': 300, //FD
            '1355940151871930368': 300, //DOT
            '1323890531927068786': 250, //Civilian
            '1374416068012933170': 100, //Contributor
            '1355939357273358467': 200, //Server Staff
            '1355939359630692553': 150, //Senior Staff + 150(Sub-role)
            '1374200095171412008': 500, //Staff Supervisor
            '1355939356069597353': 800, //BOD  
        },
        shop: [
            {
                type: 'add_role',
                name: 'Image Perms',
                description: 'Allows you to send images in the server',
                price: 60000,
                roleId: '1374129667384152084',
                emokji: '🖼️',
            },
            {
                type: 'item',
                name: 'Vehicle Insurance',
                description: 'A pickle',
                price: 800,
                emoji: '🗒️',
            }
        ]
    };
    await client.init();
})();
