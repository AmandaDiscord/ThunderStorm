// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Permissions from "../util/Permissions";

class PermissionOverwrites {
	public channel: import("./GuildChannel");
	public id: string;
	public type: "member" | "role";
	public deny: Readonly<Permissions>;
	public allow: Readonly<Permissions>;

	public static readonly default = PermissionOverwrites;

	public constructor(guildChannel: import("./GuildChannel"), data: import("discord-typings").PermissionOverwriteData) {
		this.channel = guildChannel;

		this.id = data.id;
		this.type = data.type === 0 ? "role" : "member";
		this.deny = new Permissions(BigInt(data.deny)).freeze();
		this.allow = new Permissions(BigInt(data.allow)).freeze();
	}

	public toJSON(): import("discord-typings").PermissionOverwriteData {
		return {
			id: this.id,
			type: this.type === "role" ? 0 : 1,
			deny: this.deny.bitfield.toString(),
			allow: this.allow.bitfield.toString()
		};
	}
}

export = PermissionOverwrites;
