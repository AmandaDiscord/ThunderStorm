import PartialBase from "./PartialBase";

class PartialGuild extends PartialBase<import("../Guild")> {
	public partialType: "Guild" = "Guild";
	public memberCount: number;
	public available: boolean;
	public name: string;

	public constructor(data: import("../../internal").PartialData & { unavailable?: boolean }, client: import("../Client")) {
		super(data, client);

		this.memberCount = data.number || 0;
		this.available = data.unavailable ? !data.unavailable : true;
		this.name = data.name || "unknown";
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
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => d ? new GuildMember(d as any, this.client) : null);
		else {
			const payload: { limit?: number; after?: string } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload) as unknown as Array<import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData }>;
			if (!data || data.length === 0) return null;
			if (!options.query) return data.map(d => new GuildMember(d as any, this.client));
			else if (options.ids) return data.filter(d => (d.user ? options.ids?.includes(d.user.id) : false)).map(d => new GuildMember(d, this.client));
			else return data.filter(d => options.query && d.nick?.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? options.query && `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(d, this.client));
		}
	}
}

export = PartialGuild;
