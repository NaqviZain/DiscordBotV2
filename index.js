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
        vehicles: (await import("./data/vehicles.json", { assert: { type: "json" } })).default,
        vehicleColors: (await import("./data/vehicleColors.json", { assert: { type: "json" } })).default,
        vehicleLimits: {
            regular: 6,
            special: 8
        },
        log_channel: `1210723249634148352`,
        early_roles: [1100033573211349044, 1099918152990732290, 1099918152990732296, 1184863530504163328, 1207328977379663902], 
    };
    await client.init();
})();
