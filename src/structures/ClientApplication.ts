import Application from "./Application";
import Team from "./Team";
import User from "./User";

class ClientApplication extends Application {
	public rpcOrigins!: Array<string>;
	public botRequiredCodeGrant!: boolean;
	public botPublic!: boolean;
	public owner: Team | User | null = null;

	public constructor(data: import("@amanda/discordtypings").ApplicationData, client: import("./Client")) {
		super(data, client);

		if (data.cover_image !== undefined) this.cover = data.cover_image;
		if (!this.rpcOrigins || data.rpc_origins !== undefined) this.rpcOrigins = data.rpc_origins || [];
		if (!this.botRequiredCodeGrant || data.bot_require_code_grant !== undefined) this.botRequiredCodeGrant = data.bot_require_code_grant || false;
		if (!this.botPublic || data.bot_public !== undefined) this.botPublic = data.bot_public === false ? false : true;
		if (!this.owner || data.team || data.owner) this.owner = data.team ? new Team(data.team, this.client) : data.owner ? new User(data.owner, this.client) : null;
	}

	public toJSON() {
		// @ts-ignore
		const value: import("@amanda/discordtypings").ApplicationData = Object.assign(super.toJSON(), {
			rpc_origins: this.rpcOrigins,
			bot_require_code_grant: this.botRequiredCodeGrant,
			bot_public: this.botPublic
		});
		if (this.owner instanceof Team) value["team"] = this.owner.toJSON();
		else if (this.owner) value["owner"] = this.owner.toJSON();
		return value;
	}

	public _patch(data: import("@amanda/discordtypings").ApplicationData) {
		if (data.cover_image !== undefined) this.cover = data.cover_image;
		if (!this.rpcOrigins || data.rpc_origins !== undefined) this.rpcOrigins = data.rpc_origins || [];
		if (!this.botRequiredCodeGrant || data.bot_require_code_grant !== undefined) this.botRequiredCodeGrant = data.bot_require_code_grant || false;
		if (!this.botPublic || data.bot_public !== undefined) this.botPublic = data.bot_public === false ? false : true;
		if (!this.owner || data.team || data.owner) this.owner = data.team ? new Team(data.team, this.client) : data.owner ? new User(data.owner, this.client) : null;

		super._patch(data);
	}
}

export = ClientApplication;
