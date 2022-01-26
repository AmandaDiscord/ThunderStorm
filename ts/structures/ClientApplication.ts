// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Team from "./Team";
import Application from "./interfaces/Application";
import ApplicationCommandManager from "../managers/ApplicationCommandManager";
import ApplicationFlags from "../util/ApplicationFlags";

class ClientApplication extends Application {
	public flags!: Readonly<ApplicationFlags>;
	public rpcOrigins!: Array<string>;
	public commands: ApplicationCommandManager;
	public botRequireCodeGrant!: boolean | null;
	public botPublic!: boolean | null;
	public owner!: import("./User") | import("./Team") | null;

	public static readonly default = ClientApplication;

	public constructor(client: import("../client/Client"), data: import("discord-typings").ApplicationData) {
		super(client, data);

		this.commands = new ApplicationCommandManager(this.client);
	}

	public _patch(data: import("discord-typings").ApplicationData) {
		super._patch(data);

		const User: typeof import("./User") = require("./User");

		this.flags = "flags" in data ? new ApplicationFlags(data.flags).freeze() : this.flags;
		this.cover = data.cover_image ?? this.cover ?? null;
		this.rpcOrigins = data.rpc_origins ?? this.rpcOrigins ?? [];
		this.botRequireCodeGrant = data.bot_require_code_grant ?? this.botRequireCodeGrant ?? null;
		this.botPublic = data.bot_public ?? this.botPublic ?? null;
		if (data.owner && data.owner.id === this.client.user?.id) this.client.user._patch(data.owner);
		this.owner = data.team
			? new Team(this.client, data.team)
			: data.owner
				? (data.owner.id === this.client.user?.id ? this.client.user : new User(this.client, data.owner))
				: this.owner ?? null;
	}

	public get partial() {
		return !this.name;
	}

	public async fetch() {
		const app = await this.client.api.oauth2.applications("@me").get();
		this._patch(app);
		return this;
	}
}

export = ClientApplication;
