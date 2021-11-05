import Base from "./Base";
import IntegrationApplication from "./IntegrationApplication";

import Collection from "../util/Collection";

class Integration extends Base {
	public guild: import("./Guild") | import("./Partial/PartialGuild");
	public name: string;
	public type: string;
	public enabled: boolean;
	public syncing: boolean;
	public role: import("./Partial/PartialRole");
	public user: import("./User") | null;
	public account: import("../Types").IntegrationAccount;
	public syncedAt: number;
	public roles: Collection<string, import("./Role")> = new Collection();
	public expireBehavior!: number;
	public expireGracePeriod!: number;
	public application!: IntegrationApplication | null;

	public constructor(client: import("../client/Client"), data: any, guild: import("./Guild") | import("./Partial/PartialGuild")) {
		super(client);

		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");
		const User: typeof import("./User") = require("./User");

		this.guild = guild;
		this.Id = data.Id;
		this.name = data.name;
		this.type = data.type;
		this.enabled = data.enabled;
		this.syncing = data.syncing;
		this.role = new PartialRole(this.client, data.role_id);
		this.user = data.user ? new User(this.client, data.user) : null;
		this.account = data.account;
		this.syncedAt = data.synced_at;

		this._patch(data);
	}

	public _patch(data: any) {
		this.expireBehavior = data.expire_behavior;
		this.expireGracePeriod = data.expire_grace_period;

		if ("application" in data) {
			if (this.application) {
				this.application._patch(data.application);
			} else {
				this.application = new IntegrationApplication(this.client, data.application);
			}
		} else if (!this.application) {
			this.application = null;
		}
	}

	public sync(): Promise<this> {
		this.syncing = true;
		return this.client.api
			.guilds(this.guild.Id)
			.integrations(this.Id)
			.post()
			.then(() => {
				this.syncing = false;
				this.syncedAt = Date.now();
				return this;
			});
	}

	public edit(data: import("../Types").IntegrationEditData, reason?: string): Promise<this> {
		const payload: { expire_behavior?: number; expire_grace_period?: number; } = {};
		if ("expireBehavior" in data) {
			payload.expire_behavior = data.expireBehavior;
		}
		if ("expireGracePeriod" in data) {
			payload.expire_grace_period = data.expireGracePeriod;
		}
		// The option enable_emoticons is only available for Twitch at this moment
		return this.client.api
			.guilds(this.guild.Id)
			.integrations(this.Id)
			.patch({ payload, reason })
			.then(() => {
				this._patch(data);
				return this;
			});
	}

	public delete(reason?: string): Promise<this> {
		return this.client.api
			.guilds(this.guild.Id)
			.integrations(this.Id)
			.delete({ reason })
			.then(() => this);
	}

	public toJSON() {
		return super.toJSON({ role: "roleId", guild: "guildId", user: "userId" });
	}
}

export = Integration;
