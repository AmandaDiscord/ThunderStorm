import { TypeError } from "../errors";
import { MessageComponentTypes } from "../util/Constants";

class BaseMessageComponent {
	public type: import("../Types").MessageComponentType | null;

	public constructor(data: BaseMessageComponent | import("../Types").BaseMessageComponentOptions) {
		this.type = "type" in data ? BaseMessageComponent.resolveType(data.type as import("../Types").MessageComponentTypeResolvable) : null;
	}

	public static create(data: import("../Types").MessageComponentOptions, client?: import("../client/Client") | import("../client/WebhookClient") | null, skipValidation = false): import("../Types").MessageComponent {
		let component;
		let type = data.type;

		if (typeof type === "string") type = MessageComponentTypes[type];

		switch (type) {
		case MessageComponentTypes.ACTION_ROW: {
			const MessageActionRow: typeof import("./MessageActionRow") = require("./MessageActionRow");
			component = new MessageActionRow(data as any);
			break;
		}
		case MessageComponentTypes.BUTTON: {
			const MessageButton: typeof import("./MessageButton") = require("./MessageButton");
			component = new MessageButton(data);
			break;
		}
		default:
			if (!skipValidation) {
				throw new TypeError("INVALID_TYPE", "data.type", "valid MessageComponentType");
			}
		}
		return component as import("./MessageActionRow") | import("./MessageButton");
	}

	public static resolveType(type: import("../Types").MessageComponentTypeResolvable): import("../Types").MessageComponentType {
		return typeof type === "string" ? type : MessageComponentTypes[type];
	}
}

export = BaseMessageComponent;
