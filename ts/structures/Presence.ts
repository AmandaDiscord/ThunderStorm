import Base from "./Base";
import Emoji from "./Emoji";
import ActivityFlags from "../util/ActivityFlags";
import { ActivityTypes } from "../util/Constants";

export class Presence extends Base {
	public userId: string;
	public guild: import("./Partial/PartialGuild") | null = null;
	public status!: import("../Types").PresenceStatus;
	public activities!: Array<Activity>;
	public clientStatus!: import("discord-typings").ClientStatusData;
	public user!: import("./User");
	public member: import("./GuildMember") | null = null;

	public constructor(client: import("../client/Client"), data: import("discord-typings").PresenceData) {
		super(client);
		this.userId = data.user.id;

		this._patch(data);
	}

	public _patch(data: import("discord-typings").PresenceData | import("discord-typings").PresenceUpdateData) {
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		const User: typeof import("./User") = require("./User");
		this.status = (data as import("discord-typings").PresenceUpdateData).status || this.status || "offline";

		if (data.activities) this.activities = data.activities.map(activity => new Activity(this, activity));
		else this.activities = [];
		this.clientStatus = data.client_status || null;
		if (data.user && data.guild_id) {
			this.member = new GuildMember(this.client, Object.assign({}, data as import("discord-typings").PresenceData, { mute: false, deaf: false, hoisted_role: data.guild_id, joined_at: new Date().toISOString(), nick: (data as import("discord-typings").PresenceData).nick || null }));
			this.user = this.member.user;
			this.member.presence = this;
			this.user.presence = this;
			this.guild = this.member.guild;
		} else if (data.user) {
			this.user = data.user.id === this.client.user?.Id ? this.client.user : new User(this.client, data.user);
		}

		return this;
	}

	public _clone(): this {
		const clone = Object.assign(Object.create(this), this);
		if (this.activities) clone.activities = this.activities.map(activity => activity._clone());
		return clone;
	}

	public equals(presence: Presence) {
		return (
			this === presence ||
			(presence &&
				this.status === presence.status &&
				this.activities.length === presence.activities.length &&
				this.activities.every((activity, index) => activity.equals(presence.activities[index])) &&
				this.clientStatus.web === presence.clientStatus.web &&
				this.clientStatus.mobile === presence.clientStatus.mobile &&
				this.clientStatus.desktop === presence.clientStatus.desktop)
		);
	}

	public toJSON() {
		const value: import("discord-typings").PresenceData = this.member ? this.member.toJSON() as unknown as import("discord-typings").PresenceData : { user: this.user.toJSON() } as unknown as import("discord-typings").PresenceData;

		value["activities"] = this.activities.map(i => i.toJSON());
		value["client_status"] = this.clientStatus;
		if (this.guild) value["guild_id"] = this.guild.Id;

		// @ts-ignore
		delete value["joined_at"]; delete value["mute"];
		// @ts-ignore
		delete value["deaf"]; delete value["hoisted_role"];

		return value;
	}
}

export class Activity {
	public presence: Presence;
	public name: string;
	public type: import("../Types").ActivityType;
	public url: string | null;
	public details: string | null;
	public state: string | null;
	public applicationId: string | null;
	public timestamps: { start: Date | null; end: Date | null; } | null;
	public party: Exclude<import("discord-typings").ActivityData["party"], undefined> | null;
	public assets: RichPresenceAssets | null;
	public syncId: string;
	public flags: Readonly<ActivityFlags>;
	public emoji: import("./Emoji") | null;
	public createdTimestamp: number;

	public constructor(presence: Presence, data: import("discord-typings").ActivityData) {
		this.presence = presence;

		this.name = data.name;
		this.type = ActivityTypes[data.type];
		this.url = data.url || null;
		this.details = data.details || null;
		this.state = data.state || null;
		this.applicationId = data.application_id || null;
		this.timestamps = data.timestamps
			? {
				start: data.timestamps.start ? new Date(Number(data.timestamps.start)) : null,
				end: data.timestamps.end ? new Date(Number(data.timestamps.end)) : null
			}
			: null;
		this.party = data.party || null;
		this.assets = data.assets ? new RichPresenceAssets(this, data.assets) : null;
		// @ts-ignore
		this.syncId = data.sync_id;
		this.flags = new ActivityFlags(data.flags).freeze();
		this.emoji = data.emoji ? new Emoji(presence.client, data.emoji) : null;
		this.createdTimestamp = new Date(data.created_at).getTime();
	}

	public equals(activity: Activity) {
		return (
			this === activity ||
			(activity && this.name === activity.name && this.type === activity.type && this.url === activity.url)
		);
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
		return {
			name: this.name,
			type: ActivityTypes.indexOf(this.type),
			url: this.url || undefined,
			created_at: this.createdAt.getTime(),
			timestamps: {
				start: this.timestamps?.start?.getTime() || undefined,
				end: this.timestamps?.end?.getTime() || undefined
			},
			emoji: this.emoji?.toJSON() || undefined,
			party: this.party || undefined,
			assets: this.assets?.toJSON() || undefined,
			flags: Number(this.flags.bitfield)
		};
	}

	public _clone(): Activity {
		return Object.assign(Object.create(this), this);
	}
}

export class RichPresenceAssets {
	public largeText: string | null;
	public smallText: string | null;
	public largeImage: string | null;
	public smallImage: string | null;
	public activity: Activity;

	public constructor(activity: Activity, assets: Exclude<import("discord-typings").ActivityData["assets"], undefined>) {
		this.activity = activity;

		this.largeText = assets.large_text || null;
		this.smallText = assets.small_text || null;
		this.largeImage = assets.large_image || null;
		this.smallImage = assets.small_image || null;
	}

	public smallImageURL(options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = {}) {
		if (!this.smallImage) return null;
		return this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationId as string, this.smallImage, {
			format: options.format,
			size: options.size
		});
	}

	public largeImageURL(options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = {}) {
		if (!this.largeImage) return null;
		if (/^spotify:/.test(this.largeImage)) {
			return `https://i.scdn.co/image/${this.largeImage.slice(8)}`;
		} else if (/^twitch:/.test(this.largeImage)) {
			return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.largeImage.slice(7)}.png`;
		}
		return this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationId as string, this.largeImage, {
			format: options.format,
			size: options.size
		});
	}

	public toJSON() {
		return {
			large_text: this.largeText || undefined,
			small_text: this.smallText || undefined,
			large_image: this.largeImage || undefined,
			small_image: this.smallImage || undefined
		};
	}
}

export default { Presence, Activity, RichPresenceAssets };
