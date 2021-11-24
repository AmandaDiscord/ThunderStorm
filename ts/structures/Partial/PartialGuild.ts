import { Collection } from "@discordjs/collection";
import PartialBase from "./PartialBase";

import GuildApplicationCommandManager from "../../managers/GuildApplicationCommandManager";

// @ts-ignore
class PartialGuild extends PartialBase<import("../Guild")> {
	public partialType: "Guild" = "Guild";
	public memberCount: number;
	public available: boolean;
	public name: string;
	public commands: GuildApplicationCommandManager;

	public static readonly default = PartialGuild;

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData & { unavailable?: boolean }) {
		super(client, data);

		this.memberCount = data.number || 0;
		this.available = data.unavailable ? !data.unavailable : true;
		this.name = data.name || "unknown";
		this.commands = new GuildApplicationCommandManager(this);
	}

	public get me() {
		const GuildMember: typeof import("../GuildMember") = require("../GuildMember");
		return new GuildMember(this.client, { guild_id: this.id, deaf: false, hoisted_role: this.id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [], user: (this.client.user as import("../ClientUser")).toJSON() });
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
		return {
			member_count: this.memberCount,
			unavailable: !this.available,
			name: this.name,
			...super.toJSON()
		};
	}

	public async fetchMembers(options: string): Promise<import("../GuildMember") | null>
	public async fetchMembers(options: import("../../Types").FetchMemberOptions): Promise<Array<import("../GuildMember")> | null>
	public async fetchMembers(options: string | import("../../Types").FetchMemberOptions): Promise<import("../GuildMember") | Array<import("../GuildMember")> | null> {
		const GuildMember: typeof import("../GuildMember") = require("../GuildMember");
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => d ? new GuildMember(this.client, d as any) : null);
		else {
			const payload: { limit?: number; after?: string } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload) as unknown as Array<import("discord-typings").MemberData & { user: import("discord-typings").UserData }>;
			if (!data || data.length === 0) return null;
			if (!options.query) return data.map(d => new GuildMember(this.client, d as any));
			else if (options.Ids) return data.filter(d => (d.user ? options.Ids?.includes(d.user.id) : false)).map(d => new GuildMember(this.client, d));
			else return data.filter(d => options.query && d.nick?.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? options.query && `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(this.client, d));
		}
	}

	public async fetchInvites() {
		const Invite: typeof import("../Invite") = require("../Invite");
		const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
		const invites = new Collection<string, import("../Invite")>();
		for (const inviteItem of inviteItems) {
			const invite = new Invite(this.client, inviteItem);
			invites.set(invite.code, invite);
		}
		return invites;
	}
}

export = PartialGuild;
