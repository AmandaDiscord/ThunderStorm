import PartialBase from "./PartialBase";
import PartialGuild from "./PartialGuild";

class PartialRole extends PartialBase<import("../Role")> {
	public partialType: "Role" = "Role";
	public guild: PartialGuild | null;

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
	}

	public toString() {
		return `<@&${this.id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.id : null,
			...super.toJSON()
		};
	}
}

export = PartialRole;
