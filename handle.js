const Constants = require("./constants");

const ClientUser = require("./structures/ClientUser");

const Guild = require("./structures/Guild");

const Message = require("./structures/Message");

const TextChannel = require("./structures/TextChannel");
const DMChannel = require("./structures/DMChannel");
const VoiceChannel = require("./structures/VoiceChannel");

const VoiceState = require("./structures/VoiceState");

/**
 * @param {InboundDataType<keyof import("./typings/internal").CloudStormEventDataTable>} data
 * @param {import("./typings/index").Client} client
 */
function handle(data, client) {
	client.emit(Constants.CLIENT_ONLY_EVENTS.EVENT, data);

	if (data.t === "READY") {
		/** @type {InboundDataType<"READY">} */
		// @ts-ignore
		const typed = data;
		client.user = new ClientUser(typed.d.user, client);
		client.emit(Constants.CLIENT_ONLY_EVENTS.READY, client.user);
	}

	else if (data.t === "GUILD_CREATE") {
		/** @type {InboundDataType<"GUILD_CREATE">} */
		// @ts-ignore
		const typed = data;
		const guild = new Guild(typed.d, client);
		client.emit(Constants.EVENTS.GUILD_CREATE, guild);
	}

	else if (data.t === "CHANNEL_CREATE") {
		/** @type {InboundDataType<"CHANNEL_CREATE">} */
		// @ts-ignore
		const typed = data;
		let chan
		if (typed.d.type === 0) chan = new TextChannel(typed.d, client);
		else if (typed.d.type === 1) chan = new DMChannel(typed.d, client);
		else if (typed.d.type === 2) chan = new VoiceChannel(typed.d, client);
		client.emit(Constants.EVENTS.CHANNEL_CREATE, chan);
	}

	else if (data.t === "MESSAGE_CREATE") {
		/** @type {InboundDataType<"MESSAGE_CREATE">} */
		// @ts-ignore
		const typed = data;
		const message = new Message(typed.d, client);
		client.emit(Constants.EVENTS.MESSAGE_CREATE, message);
	}

	else if (data.t === "MESSAGE_REACTION_ADD") {
		/** @type {InboundDataType<"MESSAGE_REACTION_ADD">} */
		// @ts-ignore
		const typed = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_ADD, typed.d);
	}

	else if (data.t === "MESSAGE_REACTION_REMOVE") {
		/** @type {InboundDataType<"MESSAGE_REACTION_REMOVE">} */
		// @ts-ignore
		const typed = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE, typed.d);
	}

	else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
		/** @type {InboundDataType<"MESSAGE_REACTION_REMOVE_ALL">} */
		// @ts-ignore
		const typed = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE_ALL, typed.d);
	}

	else if (data.t === "MESSAGE_UPDATE") {
		/** @type {InboundDataType<"MESSAGE_UPDATE">} */
		// @ts-ignore
		const typed = data;
		const message = new Message(typed.d, client)
		client.emit(Constants.EVENTS.MESSAGE_UPDATE, message);
	}

	else if (data.t === "MESSAGE_DELETE") {
		/** @type {InboundDataType<"MESSAGE_DELETE">} */
		// @ts-ignore
		const typed = data;
		client.emit(Constants.EVENTS.MESSAGE_DELETE, typed.d);
	}

	else if (data.t === "VOICE_STATE_UPDATE") {
		/** @type {InboundDataType<"VOICE_STATE_UPDATE">} */
		// @ts-ignore
		const typed = data;
		const voicestate = new VoiceState(typed.d, client);
		client.emit(Constants.EVENTS.VOICE_STATE_UPDATE, voicestate);
	}
}

module.exports = handle;

/**
 * @typedef InboundDataType
 * @type {import("./typings/internal").InboundDataType<T>}
 * @template {keyof import("./typings/internal").CloudStormEventDataTable} T
 */
