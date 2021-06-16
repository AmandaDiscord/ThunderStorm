import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageDeleteAction extends Action {
	public handle(data: import("@amanda/discordtypings").MessageDeleteData) {
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const message = new PartialMessage(this.client, data);
		this.client.emit(Events.MESSAGE_DELETE, message);

		return { message };
	}
}

export = MessageDeleteAction;
