import Action from "./Action";
import { Events } from "../../util/Constants";

class WebhooksUpdate extends Action {
	public handle(data: { guild_id: string; channel_id: string }) {
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		this.client.emit(Events.WEBHOOKS_UPDATE, new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id }));
	}
}

export = WebhooksUpdate;
