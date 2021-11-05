import PartialBase from "./PartialBase";

class PartialRole extends PartialBase<import("../Role")> {
	public partialType: "Role" = "Role";
	public guild: import("./PartialGuild") | null;
	public name: string;

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData) {
		super(client, data);

		const PartialGuild: typeof import("./PartialGuild") = require("./PartialGuild");

		this.guild = data.guild_id ? new PartialGuild(this.client, { id: data.guild_id }) : null;
		this.name = data.name || "deleted-role";
	}

	public toString() {
		return `<@&${this.Id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.Id : null,
			...super.toJSON()
		};
	}
}

export = PartialRole;
