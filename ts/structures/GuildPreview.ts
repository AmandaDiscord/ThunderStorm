import Base from "./Base";
import GuildPreviewEmoji from "./GuildPreviewEmoji";
import Collection from "../util/Collection";

class GuildPreview extends Base {
	public name!: string;
	public icon!: string | null;
	public splash!: string | null;
	public discoverySplash!: string | null;
	public features!: Array<import("../Types").Feature>;
	public approximateMemberCount!: number;
	public approximatePresenceCount!: number;
	public description!: string | null;
	public emojis!: Collection<string, GuildPreviewEmoji>;

	public constructor(client: import("../client/Client"), data: import("discord-typings").GuildPreviewData) {
		super(client);

		if (data) this._patch(data);
	}

	public _patch(data: import("discord-typings").GuildPreviewData) {
		this.id = data.id;
		this.name = data.name;
		this.icon = data.icon;
		this.splash = data.splash;
		this.discoverySplash = data.discovery_splash;
		this.features = data.features;
		this.approximateMemberCount = data.approximate_member_count as number;
		this.approximatePresenceCount = data.approximate_presence_count as number;
		this.description = data.description || null;

		if (!this.emojis) {
			this.emojis = new Collection();
		} else {
			this.emojis.clear();
		}
		for (const emoji of data.emojis) {
			this.emojis.set(emoji.id as string, new GuildPreviewEmoji(this.client, emoji, this));
		}
	}

	public splashURL(options: import("../Types").ImageURLOptions = {}) {
		if (!this.splash) return null;
		return this.client.rest.cdn.Splash(this.id, this.splash, options.format, options.size);
	}

	public discoverySplashURL(options: import("../Types").ImageURLOptions = {}) {
		if (!this.discoverySplash) return null;
		return this.client.rest.cdn.DiscoverySplash(this.id, this.discoverySplash, options.format, options.size);
	}

	public iconURL(options: import("../Types").ImageURLOptions & { dynamic?: boolean } = {}) {
		if (!this.icon) return null;
		return this.client.rest.cdn.Icon(this.id, this.icon, options.format, options.size, options.dynamic);
	}

	async fetch(): Promise<this> {
		const data = await this.client._snow.guild.getGuildPreview(this.id);
		this._patch(data);
		return this;
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
		const json = super.toJSON();
		json.iconURL = this.iconURL();
		json.splashURL = this.splashURL();
		return json;
	}
}

export = GuildPreview;
