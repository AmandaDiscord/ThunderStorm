import Permissions from "./Permissions";

class PermissionOverwrites {
	public channel: import("./GuildChannel");
	public id: string;
	public type: "member" | "role"
	public deny: Readonly<Permissions>;
	public allow: Readonly<Permissions>;

	public constructor(guildChannel: import("./GuildChannel"), data: import("@amanda/discordtypings").PermissionOverwriteData) {
		this.channel = guildChannel;

		this.id = data.id;
		this.type = data.type === 0 ? "role" : "member";
		this.deny = new Permissions(data.deny).freeze();
		this.allow = new Permissions(data.allow).freeze();
	}

	public toJSON(): import("@amanda/discordtypings").PermissionOverwriteData {
		return {
			id: this.id,
			type: this.type === "role" ? 0 : 1,
			deny: this.deny.bitfield.toString(),
			allow: this.allow.bitfield.toString()
		};
	}
}

export = PermissionOverwrites;
