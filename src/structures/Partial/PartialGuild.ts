import PartialBase from "./PartialBase";

class PartialGuild extends PartialBase<import("../Guild")> {
	public partialType: "Guild";
	public memberCount: number;
	public available: boolean;

	public constructor(data: import("../../internal").PartialData & { unavailable?: boolean }, client: import("../Client")) {
		super(data, client);

		this.partialType = "Guild";
		this.memberCount = data.number || 0;
		this.available = data.unavailable ? !data.unavailable : true;
	}

	public toJSON() {
		return {
			member_count: this.memberCount,
			unavailable: !this.available,
			...super.toJSON()
		};
	}

	public async fetchMembers(options: string): Promise<import("../GuildMember") | null>
	public async fetchMembers(options: import("../../Types").FetchMemberOptions): Promise<Array<import("../GuildMember")> | null>
	public async fetchMembers(options: string | import("../../Types").FetchMemberOptions): Promise<import("../GuildMember") | Array<import("../GuildMember")> | null> {
		const GuildMember = (await import("../GuildMember")).default;
		// @ts-ignore
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => d ? new GuildMember(d, this.client) : null);
		else {
			const payload: { limit?: number; after?: string } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
			if (!data || data.length === 0) return null;
			// @ts-ignore
			if (!options.query) return data.map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else if (options.ids) return data.filter(d => (d.user ? options.ids?.includes(d.user.id) : false)).map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else return data.filter(d => d.nick?.includes(options.query) || (d.user ? d.user.username.includes(options.query) : false) || (d.user ? d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(d, this.client));
		}
	}
}

export = PartialGuild;
