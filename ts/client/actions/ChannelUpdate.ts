import Action from "./Action";
import { Events } from "../../util/Constants";

class ChannelUpdateAction extends Action {
	public handle(data: import("@amanda/discordtypings").ChannelData) {
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");
		const TextChannel: typeof import("../../structures/TextChannel") = require("../../structures/TextChannel");
		const DMChannel: typeof import("../../structures/DMChannel") = require("../../structures/DMChannel");
		const VoiceChannel: typeof import("../../structures/VoiceChannel") = require("../../structures/VoiceChannel");
		const CategoryChannel: typeof import("../../structures/CategoryChannel") = require("../../structures/CategoryChannel");
		const NewsChannel: typeof import("../../structures/NewsChannel") = require("../../structures/NewsChannel");
		const StoreChannel: typeof import("../../structures/StoreChannel") = require("../../structures/StoreChannel");
		const StageChannel: typeof import("../../structures/StageChannel") = require("../../structures/StageChannel");
		const Channel: typeof import("../../structures/Channel") = require("../../structures/Channel");

		let guild;
		// @ts-ignore
		if (data.guild_id) guild = new PartialGuild(this.client, { id: data.guild_id });

		let chan;
		if (data.type === 0 && guild) chan = new TextChannel(guild, data as any);
		else if (data.type === 1) chan = new DMChannel(this.client, data as any);
		else if (data.type === 2 && guild) chan = new VoiceChannel(guild, data as any);
		else if (data.type === 4 && guild) chan = new CategoryChannel(guild, data as any);
		else if (data.type === 5 && guild) chan = new NewsChannel(guild, data as any);
		else if (data.type === 6 && guild) chan = new StoreChannel(guild, data as any);
		else if (data.type === 13 && guild) chan = new StageChannel(guild, data as any);
		else chan = new Channel(this.client, data);
		this.client.emit(Events.CHANNEL_UPDATE, chan as any);
		return { channel: chan };
	}
}

export = ChannelUpdateAction;
