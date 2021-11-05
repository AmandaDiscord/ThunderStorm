import Permissions from "../util/Permissions";

class PermissionOverwrites {
	public channel: import("./GuildChannel");
	public Id: string;
	public type: "member" | "role";
	public deny: Readonly<Permissions>;
	public allow: Readonly<Permissions>;

	public constructor(guildChannel: import("./GuildChannel"), data: import("discord-typings").PermissionOverwriteData) {
		this.channel = guildChannel;

		this.Id = data.id;
		this.type = data.type === 0 ? "role" : "member";
		this.deny = new Permissions(BigInt(data.deny)).freeze();
		this.allow = new Permissions(BigInt(data.allow)).freeze();
	}

	public toJSON(): import("discord-typings").PermissionOverwriteData {
		return {
			id: this.Id,
			type: this.type === "role" ? 0 : 1,
			deny: this.deny.bitfield.toString(),
			allow: this.allow.bitfield.toString()
		};
	}
}

export = PermissionOverwrites;
