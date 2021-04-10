import CategoryChannel from "./CategoryChannel";
import Collection from "./Util/Collection";
import GuildMember from "./GuildMember";
import NewsChannel from "./NewsChannel";
import Permissions from "./Permissions";
import StageChannel from "./StageChannel";
import TextChannel from "./TextChannel";
import VoiceChannel from "./VoiceChannel";

import Constants from "../Constants";

import SnowflakeUtil from "./Util/SnowflakeUtil";

class Guild {
	public client: import("./Client");
	public partial: false;
	public name: string;
	public id: string;
	public available: boolean;
	public memberCount: number;
	public ownerID: string;
	public owner: import("./Partial/PartialUser");
	public icon: string | null;
	public members: Collection<string, import("./GuildMember")>;
	public channels: Collection<string, import("./GuildChannel")>;
	public permissions: Permissions;

	public constructor(data: import("@amanda/discordtypings").GuildData, client: import("./Client")) {
		this.client = client;
		this.partial = false;

		const PartialUser = require("./Partial/PartialUser"); // lazy load

		this.name = data.name || "unknown";
		this.id = data.id;
		this.available = data.unavailable != undefined ? !data.unavailable : true;
		this.memberCount = data.member_count || 0;
		this.ownerID = data.owner_id || Constants.SYSTEM_USER_ID; // fallback to System User (yes, System really has an ID.)
		this.owner = new PartialUser({ id: this.ownerID }, client);
		this.icon = data.icon || null;
		this.permissions = new Permissions(data.permissions || 0);

		this.members = data.members && Array.isArray(data.members) ? new Collection(data.members.map(member => [member.user.id, new GuildMember(member, client)])) : new Collection();

		this.channels = data.channels && Array.isArray(data.channels) ? new Collection(data.channels.map(channel => {
			let chan;
			if (channel.type === 2) chan = new VoiceChannel(channel, client);
			else if (channel.type === 4) chan = new CategoryChannel(channel, client);
			else if (channel.type === 5) chan = new NewsChannel(channel, client);
			else if (channel.type === 13) chan = new StageChannel(channel, client);
			else chan = new TextChannel(channel, client);
			return [channel.id, chan];
		})) : new Collection();
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	/**
	 * The acronym that shows up in place of a guild icon.
	 */
	public get nameAcronym() {
		return this.name
			.replace(/'s /g, " ")
			.replace(/\w+/g, e => e[0])
			.replace(/\s/g, "");
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public iconURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.icon) return null;
		const format = this.icon.startsWith("a_") && options.dynamic ? "gif" : options.format;
		return `${Constants.BASE_CDN_URL}/icons/${this.id}/${this.icon}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
	}

	public toJSON() {
		return {
			name: this.name,
			id: this.id,
			unavailable: !this.available,
			member_count: this.memberCount,
			owner_id: this.ownerID,
			icon: this.icon,
			permissions: this.permissions.bitfield.toString(),
			members: [...this.members.values()].map(mem => mem.toJSON()),
			channels: [...this.channels.values()].map(chan => chan.toJSON())
		};
	}

	public async fetchMembers(options: string): Promise<import("./GuildMember") | null>
	public async fetchMembers(options: import("../Types").FetchMemberOptions): Promise<Array<import("./GuildMember")> | null>
	public async fetchMembers(options: string | { ids?: Array<string>; query?: string; limit?: number; after?: string; }) {
		// @ts-ignore
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember(d, this.client));
		else {
			const payload: { limit?: number; after?: string; } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
			if (!data || data.length === 0) return null;
			// @ts-ignore
			if (!options.query) return data.map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else if (options.ids) return data.filter(d => (d.user ? options.ids.includes(d.user.id) : false)).map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else return data.filter(d => d.nick.includes(options.query) || (d.user ? d.user.username.includes(options.query) : false) || (d.user ? d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(d, this.client));
		}
	}
}

export = Guild;
