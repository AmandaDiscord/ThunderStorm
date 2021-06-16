import TextBasedChannel from "../interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

// @ts-ignore
class PartialUser extends PartialBase<import("../User")> implements TextBasedChannel {
	public lastMessageID: TextBasedChannel["lastMessageID"] = null;
	public lastMessage: TextBasedChannel["lastMessage"] = null;
	public send!: TextBasedChannel["send"];

	public partialType: "User" = "User";

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData) {
		super(client, data);
	}

	public toString() {
		return `<@${this.id}>`;
	}
}

TextBasedChannel.applyToClass(PartialUser);

export = PartialUser;
