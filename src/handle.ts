import Constants from "./Constants";

import CategoryChannel from "./structures/CategoryChannel";
import ClientUser from "./structures/ClientUser";
import DMChannel from "./structures/DMChannel";
import Guild from "./structures/Guild";
import GuildMember from "./structures/GuildMember";
import Message from "./structures/Message";
import NewsChannel from "./structures/NewsChannel";
import TextChannel from "./structures/TextChannel";
import VoiceChannel from "./structures/VoiceChannel";
import VoiceState from "./structures/VoiceState";
import Role from "./structures/Role";

import PartialRole from "./structures/Partial/PartialRole";

function handle(data: import("./internal").InboundDataType<keyof import("./internal").CloudStormEventDataTable>, client: import("./structures/Client")) {

	if (data.t === "READY") {
		client.emit(Constants.CLIENT_ONLY_EVENTS.EVENT, data);
		// @ts-ignore
		const typed: import("./internal").InboundDataType<"READY"> = data;
		client.user = new ClientUser(typed.d.user, client);
		client.readyTimestamp = Date.now();
		client.emit(Constants.EVENTS.READY, client.user);
	}

	if (!client.user) return;
	if (data.t !== "READY") client.emit(Constants.CLIENT_ONLY_EVENTS.EVENT, data);

	if (data.t === "GUILD_CREATE") {
		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_CREATE"> = data;
		const guild = new Guild(typed.d, client);
		client.emit(Constants.EVENTS.GUILD_CREATE, guild);
	} else if (data.t === "GUILD_DELETE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_DELETE"> = data;

		const PartialGuild = require("./structures/Partial/PartialGuild");

		client.emit(Constants.EVENTS.GUILD_DELETE, new PartialGuild({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
	} else if (data.t === "CHANNEL_CREATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"CHANNEL_CREATE"> = data;

		let chan;
		if (typed.d.type === 0) chan = new TextChannel(typed.d, client);
		else if (typed.d.type === 1) chan = new DMChannel(typed.d, client);
		else if (typed.d.type === 2) chan = new VoiceChannel(typed.d, client);
		else if (typed.d.type === 4) chan = new CategoryChannel(typed.d, client);
		else if (typed.d.type === 5) chan = new NewsChannel(typed.d, client);
		else return;
		client.emit(Constants.EVENTS.CHANNEL_CREATE, chan);
	} else if (data.t === "MESSAGE_CREATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_CREATE"> = data;

		const message = new Message(typed.d, client);
		client.emit(Constants.EVENTS.MESSAGE_CREATE, message);
	} else if (data.t === "MESSAGE_REACTION_ADD") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_REACTION_ADD"> = data;

		client.emit(Constants.EVENTS.MESSAGE_REACTION_ADD, typed.d);
	} else if (data.t === "MESSAGE_REACTION_REMOVE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_REACTION_REMOVE"> = data;

		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE, typed.d);
	} else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_REACTION_REMOVE_ALL"> = data;

		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE_ALL, typed.d);
	} else if (data.t === "MESSAGE_UPDATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_UPDATE"> = data;

		const message = new Message(typed.d, client);
		client.emit(Constants.EVENTS.MESSAGE_UPDATE, message);
	} else if (data.t === "MESSAGE_DELETE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"MESSAGE_DELETE"> = data;

		client.emit(Constants.EVENTS.MESSAGE_DELETE, typed.d);
	} else if (data.t === "VOICE_STATE_UPDATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"VOICE_STATE_UPDATE"> = data;

		const voicestate = new VoiceState(typed.d, client);
		client.emit(Constants.EVENTS.VOICE_STATE_UPDATE, voicestate);
	} else if (data.t === "GUILD_MEMBER_UPDATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_MEMBER_UPDATE"> = data;

		if (!typed.d.user) return;

		client.emit(Constants.EVENTS.GUILD_MEMBER_UPDATE, new GuildMember(typed.d, client));
	} else if (data.t === "GUILD_ROLE_CREATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_ROLE_CREATE"> = data;

		client.emit(Constants.EVENTS.GUILD_ROLE_CREATE, new Role({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
	} else if (data.t === "GUILD_ROLE_UPDATE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_ROLE_UPDATE"> = data;

		client.emit(Constants.EVENTS.GUILD_ROLE_UPDATE, new Role({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
	} else if (data.t === "GUILD_ROLE_DELETE") {

		// @ts-ignore
		const typed: import("./internal").InboundDataType<"GUILD_ROLE_DELETE"> = data;

		client.emit(Constants.EVENTS.GUILD_ROLE_DELETE, new PartialRole({ id: typed.d.role_id, guild_id: typed.d.guild_id }, client));
	}
}

export = handle;
