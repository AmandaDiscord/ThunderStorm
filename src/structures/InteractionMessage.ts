import SnowflakeUtil from "./Util/SnowflakeUtil";
import TextBasedChannel from "./Interfaces/TextBasedChannel";

class InteractionMessage {
	public client: import("./Client");
	public type!: "ping" | "command";
	public id!: string;
	public applicationID!: string;
	public channel: import("./Partial/PartialChannel") | null = null;
	public guild: import("./Partial/PartialGuild") | null = null;
	public member: import("./GuildMember") | null = null;
	public author!: import("./User");
	public command: import("./InteractionCommand") | null = null;
	public token!: string;
	public version!: number;

	public constructor(data: import("@amanda/discordtypings").InteractionData, client: import("./Client")) {
		this.client = client;

		this._patch(data);
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	/**
	 * ACK an interaction ping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
	 * Alternatively, return { type: 1 } in your route handler.
	 */
	public pong() {
		return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 1 });
	}

	/**
	 * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
	 */
	public async reply(content: import("../Types").StringResolvable, options: import("../Types").InteractionMessageOptions = {}) {
		const payload = await TextBasedChannel.transform(content, options, false, true);
		// @ts-ignore
		return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 4, data: payload });
	}

	/**
	 * For the most part, equivalent to TextableChannel.sendTyping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
	 */
	public think() {
		return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 5 });
	}

	public async getOriginal() {
		const Message: typeof import("./Message") = require("./Message");
		const msg = await this.client._snow.interaction.getOriginalInteractionResponse(this.applicationID, this.token);
		if (this.guild) msg.guild_id = this.guild.id;
		return new Message(msg, this.client);
	}

	public async editOriginal(content: import("../Types").StringResolvable, options: import("../Types").InteractionMessageOptions = {}) {
		const payload = await TextBasedChannel.transform(content, options, true, true);
		// @ts-ignore
		return this.client._snow.interaction.editOriginalInteractionResponse(this.applicationID, this.token, payload);
	}

	public async followup(content: import("../Types").StringResolvable, options: import("../Types").InteractionMessageOptions = {}) {
		const payload = await TextBasedChannel.transform(content, options, false, true);
		// @ts-ignore
		return this.client._snow.interaction.createFollowupMessage(this.id, this.token, { type: 4, data: payload });
	}

	public toJSON() {
		return {
			type: this.type === "ping" ? 1 : 2,
			id: this.id,
			application_id: this.applicationID,
			channel_id: this.channel?.id || null,
			guild_id: this.guild?.id || null,
			member: this.member?.toJSON() || null,
			user: this.author?.toJSON() || null,
			token: this.token,
			version: this.version,
			data: this.command?.toJSON() || null
		};
	}

	public _patch(data: import("@amanda/discordtypings").InteractionData) {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		const InteractionCommand: typeof import("./InteractionCommand") = require("./InteractionCommand");
		const User: typeof import("./User") = require("./User");

		if (data.type) this.type = data.type === 1 ? "ping" : "command";
		if (data.id) this.id = data.id;
		if (data.application_id) this.applicationID = data.application_id;
		if (data.channel_id) this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, this.client);
		if (data.guild_id) this.guild = new PartialGuild({ id: data.guild_id }, this.client);
		if (data.member) this.member = new GuildMember(data.member, this.client);
		if (data.user || this.member) this.author = data.user ? new User(data.user, this.client) : (this.member as import("./GuildMember")).user;
		if (data.token) this.token = data.token;
		if (data.version) this.version = data.version;
		if (data.data) this.command = new InteractionCommand(this, data.data);
	}
}

export = InteractionMessage;
