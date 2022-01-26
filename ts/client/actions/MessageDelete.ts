// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageDeleteAction extends Action {
	public static readonly default = MessageDeleteAction;

	public handle(data: import("discord-typings").MessageDeleteData) {
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const message = new PartialMessage(this.client, data);
		this.client.emit(Events.MESSAGE_DELETE, message);

		return { message };
	}
}

export = MessageDeleteAction;
