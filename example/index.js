const CloudStorm = require("cloudstorm");
const SnowTransfer = require('snowtransfer');
const ThunderStorm = require("../index");
const util = require("util");

const token = "NDE1OTY5MjYyNjg4MDEwMjQx.XVHOJQ.wz9m7wbQ6p1wWlJblolYTbboo_w";
const prefix = "*";

const Gateway = new CloudStorm.Client(token, { intents: ["DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"] });
const Rest = new SnowTransfer(token, { disableEveryone: true });

const client = new ThunderStorm.Client({ snowtransfer: Rest, cloudstorm: Gateway });

(async () => {
	client.on("ready", () => console.log(`Logged in`));
	client.on("message", async msg => {
		if (!msg.content.startsWith(prefix)) return;
		if (msg.author.bot) return;

		let command = msg.content.substring(prefix.length).split(" ")[0];
		let suffix = msg.content.substring(prefix.length + command.length + 1);

		if (command === "eval") {
			if (msg.author.id !== "320067006521147393") return;
			let result;
			try {
				result = await eval(suffix);
			} catch (e) {
				result = e;
			}
			if (result instanceof Promise) result = await result;
			let str = util.inspect(result, true, 2).replace(new RegExp(client.token, "g"), "");
			if (str.length > 1998) str = str.slice(0, 1998);
			Rest.channel.createMessage(msg.channelID, str);
		}
	});
	client.login();
})().catch(console.error);
