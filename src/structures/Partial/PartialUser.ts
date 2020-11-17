import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

class PartialUser extends PartialBase<import("../User")> {
	public partialType: "User";

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		this.partialType = "User";
	}

	public toString() {
		return `<@${this.id}>`;
	}

	public send(content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

export = PartialUser;
