import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

class PartialUser extends PartialBase<import("../User")> {
	public partialType: "User" = "User";

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);
	}

	public toString() {
		return `<@${this.id}>`;
	}

	public send(content: import("../../Types").StringResolvable, options: Exclude<import("../../Types").MessageOptions, "suppress"> = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

export = PartialUser;
