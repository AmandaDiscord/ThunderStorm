// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseGuild from "./BaseGuild";
import Permissions from "../util/Permissions";

class OAuth2Guild extends BaseGuild {
	public owner: boolean;
	public permissions: Readonly<Permissions>;

	public static readonly default = OAuth2Guild;

	constructor(client: import("../client/Client"), data: Partial<import("discord-typings").GuildData>) {
		super(client, data);

		this.owner = data.owner as boolean;
		this.permissions = new Permissions(BigInt(data.permissions || 0)).freeze();
	}
}

export = OAuth2Guild;
