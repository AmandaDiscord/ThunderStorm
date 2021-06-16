import Base from "./Base";
import { InteractionTypes } from "../util/Constants";
import SnowflakeUtil from "../util/SnowflakeUtil";

class Interaction extends Base {
	public type: import("../Types").InteractionType;
	public token: string;
	public applicationID: string;
	public channelID: string | null;
	public guildID: string | null;
	public user: import("./User");
	public member: import("./GuildMember") | null;
	public version: number;

	public channel: import("./Partial/PartialChannel") | null;
	public guild: import("./Partial/PartialGuild") | null;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").InteractionData) {
		super(client);

		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const User: typeof import("./User") = require("./User");

		this.type = InteractionTypes[data.type];
		this.id = data.id;
		this.token = data.token;
		this.applicationID = data.application_id;
		this.channelID = data.channel_id ?? null;
		this.guildID = data.guild_id ?? null;
		if (data.member) {
			this.member = new GuildMember(this.client, data.member);
			this.user = this.member.user;
		} else {
			this.member = null;
			this.user = new User(this.client, data.user as any);
		}
		this.version = data.version;

		this.channel = data.channel_id ? new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" }) : null;
		this.guild = this.channel && this.channel.guild ? this.channel.guild : (data.guild_id ? new PartialGuild(this.client, { id: data.guild_id }) : null);
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public isCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND;
	}

	public isMessageComponent() {
		return InteractionTypes[this.type] === InteractionTypes.MESSAGE_COMPONENT;
	}
}

export = Interaction;
