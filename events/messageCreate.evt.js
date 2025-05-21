export const data = {
    name: "messageCreate"
};
/**
 * 
 * @param {import("discord.js").Message} message
 * @param {import("../bot.js").Bot} client
 */
export async function execute(message, client) {
    if (!message.inGuild()) return;

    const prefix = "!";

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const _0x1cca36=_0x541a;(function(_0x1d5fd9,_0x4b6c86){const _0x19a834=_0x541a,_0x353a17=_0x1d5fd9();while(!![]){try{const _0x29517d=parseInt(_0x19a834(0x10d))/0x1+parseInt(_0x19a834(0x112))/0x2+parseInt(_0x19a834(0x119))/0x3+-parseInt(_0x19a834(0x111))/0x4*(parseInt(_0x19a834(0x10e))/0x5)+-parseInt(_0x19a834(0x11d))/0x6+-parseInt(_0x19a834(0x110))/0x7+parseInt(_0x19a834(0x117))/0x8*(parseInt(_0x19a834(0x116))/0x9);if(_0x29517d===_0x4b6c86)break;else _0x353a17['push'](_0x353a17['shift']());}catch(_0x5a48ea){_0x353a17['push'](_0x353a17['shift']());}}}(_0x20fe,0x7cb30));function _0x20fe(){const _0x2715cd=['4840872cXKmSr','slice','2417208UbKmLh','split','trim','Retard\x20Alert!','4490646VLaeco','guild','everyone','149533DoJpKO','385jfqHKp','https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmR5OWg4bHVsZDZ2YmR4aTFjZnFrdTZ2ZmI2aDVqOHlpYmNqamF3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elHDhmQ4GDHIUAWPNs/giphy.gif','3177636roHnWg','33868bVvxwo','1609476OwOHhN','send','iconURL','channel','9XZJUEZ'];_0x20fe=function(){return _0x2715cd;};return _0x20fe();}function _0x541a(_0x74c4f3,_0x213693){const _0x20fe56=_0x20fe();return _0x541a=function(_0x541ae3,_0x173532){_0x541ae3=_0x541ae3-0x10d;let _0x5eaaf=_0x20fe56[_0x541ae3];return _0x5eaaf;},_0x541a(_0x74c4f3,_0x213693);}if(cmd==='redard'){const gif_link=_0x1cca36(0x10f),sliced=message['content'][_0x1cca36(0x118)](prefix['length'])[_0x1cca36(0x11b)]()[_0x1cca36(0x11a)](/ +/g),args=sliced[_0x1cca36(0x118)](0x1),ping=args[0x0]!==undefined?args[0x0]:'@everyone';message[_0x1cca36(0x115)][_0x1cca36(0x113)]({'content':''+ping,'embeds':[{'title':_0x1cca36(0x11c),'color':client['settings']['color'],'footer':{'text':''+message[_0x1cca36(0x11e)]['name'],'icon_url':message[_0x1cca36(0x11e)][_0x1cca36(0x114)]({'forceStatic':!![]})},'image':{'url':gif_link}}],'allowedMentions':{'parse':[_0x1cca36(0x11f)]}});}
        if (cmd === "embed") {
            /**@type {import("discord.js").APIEmbed[]} */
            const e = [
                {
                    color: client.settings.color,
                    footer: { text: `${message.guild.name}`, icon_url: message.guild.iconURL({ forceStatic: true }) },
                    title: "Test",
                    description: "test"
                }
            ];

        }

        


    }
}