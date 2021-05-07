import Constants from "../Constants";

import SnowflakeUtil from "./Util/SnowflakeUtil";

import Collection from "./Util/Collection";

class Emoji {
	public client: import("./Client");
	public id: string | null = null;
	public animated = false;
	public available = false;
	public managed = false;
	public name!: string;
	public requiresColons = true;
	public user: import("./User") | null = null;
	public roles: Collection<string, import("./Partial/PartialRole")> = new Collection();

	public constructor(data: import("@amanda/discordtypings").EmojiData, client: import("./Client")) {
		this.client = client;

		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");
		const User: typeof import("./User") = require("./User");

		if (data.id || data.id === null) this.id = data.id;
		if (data.name) this.name = data.name;
		if (data.animated != undefined) this.animated = data.animated;
		if (data.managed != undefined) this.managed = data.managed;
		if (data.available != undefined) this.available = data.available;
		if (data.require_colons != undefined) this.requiresColons = data.require_colons;
		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(data.user, this.client);
		}
		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) this.roles.set(role, new PartialRole({ id: role }, this.client));
		}
	}

	public get identifier() {
		if (this.id) return `${this.name}:${this.id}`;
		return encodeURIComponent(this.name);
	}

	public get url() {
		return `${Constants.BASE_CDN_URL}/emojis/${this.id}.${this.animated ? "gif" : "png"}`;
	}

	public get createdTimestamp() {
		if (!this.id) return null;
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		if (!this.id) return null;
		return new Date(this.createdTimestamp as number);
	}

	public toJSON() {
		return {
			id: this.id,
			animated: this.animated,
			available: this.available,
			managed: this.managed,
			name: this.name,
			requires_colons: this.requiresColons
		};
	}

	public toString() {
		return this.id ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.name;
	}

	public _patch(data: import("@amanda/discordtypings").EmojiData) {
		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");
		const User: typeof import("./User") = require("./User");

		if (data.id || data.id === null) this.id = data.id;
		if (data.name) this.name = data.name;
		if (data.animated != undefined) this.animated = data.animated;
		if (data.managed != undefined) this.managed = data.managed;
		if (data.available != undefined) this.available = data.available;
		if (data.require_colons != undefined) this.requiresColons = data.require_colons;
		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(data.user, this.client);
		}
		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) this.roles.set(role, new PartialRole({ id: role }, this.client));
		}
	}
}

export = Emoji;
