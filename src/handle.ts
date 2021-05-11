import Constants from "./Constants";

import Collection from "./structures/Util/Collection";

import CategoryChannel from "./structures/CategoryChannel";
import Channel from "./structures/Channel";
import ClientUser from "./structures/ClientUser";
import DMChannel from "./structures/DMChannel";
import Emoji from "./structures/Emoji";
import Guild from "./structures/Guild";
import GuildMember from "./structures/GuildMember";
import Invite from "./structures/Invite";
import Message from "./structures/Message";
import MessageReaction from "./structures/MessageReaction";
import NewsChannel from "./structures/NewsChannel";
import Role from "./structures/Role";
import StageChannel from "./structures/StageChannel";
import TextChannel from "./structures/TextChannel";
import ThreadMember from "./structures/ThreadMember";
import ThreadNewsChannel from "./structures/ThreadNewsChannel";
import ThreadTextChannel from "./structures/ThreadTextChannel";
import User from "./structures/User";
import VoiceChannel from "./structures/VoiceChannel";
import VoiceState from "./structures/VoiceState";

import PartialChannel from "./structures/Partial/PartialChannel";
import PartialGuild from "./structures/Partial/PartialGuild";
import PartialMessage from "./structures/Partial/PartialMessage";
import PartialRole from "./structures/Partial/PartialRole";
import PartialThreadChannel from "./structures/Partial/PartialThreadChannel";
import PartialUser from "./structures/Partial/PartialUser";

let guildInboundTimeout: NodeJS.Timeout | null = null;
const guildInboundTimeoutDuration = 5000;

function setReady(client: import("./structures/Client")) {
	client.readyTimestamp = Date.now();
	client.emit("ready", client.user as import("./structures/ClientUser"));
	if (guildInboundTimeout) clearTimeout(guildInboundTimeout);
	guildInboundTimeout = null;
}

function createChannel(channel: any, client: import("./structures/Client")) {
	let chan;
	if (channel.type === 0) chan = new TextChannel(channel, client);
	else if (channel.type === 1) chan = new DMChannel(channel, client);
	else if (channel.type === 2) chan = new VoiceChannel(channel, client);
	else if (channel.type === 4) chan = new CategoryChannel(channel, client);
	else if (channel.type === 5) chan = new NewsChannel(channel, client);
	else if (channel.type === 13) chan = new StageChannel(channel, client);
	else chan = new Channel(channel, client);
	return chan;
}

function handle(data: import("./internal").InboundDataType<keyof import("./internal").CloudStormEventDataTable>, client: import("./structures/Client")) {
	if (data.t === "READY") {

		client.emit(Constants.CLIENT_ONLY_EVENTS.RAW, data);
		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"READY">> = data;
		if (!client.user) client.user = new ClientUser(typed.d.user, client);
		else client.user._patch(typed.d.user);
		if (client.readyAt === null && !guildInboundTimeout) guildInboundTimeout = setTimeout(() => setReady(client), guildInboundTimeoutDuration);
		client.emit(Constants.EVENTS.SHARD_READY, data.shard_id, new Set(typed.d.guilds.filter(g => g.unavailable).map(g => g.id) || []));
	}

	if (!client.user) return;
	if (data.t !== "READY") client.emit(Constants.CLIENT_ONLY_EVENTS.RAW, data);
	if (data.t === "CHANNEL_CREATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"CHANNEL_CREATE">> = data;
		client.emit(Constants.EVENTS.CHANNEL_CREATE, createChannel(typed.d, client) as any);
	} else if (data.t === "CHANNEL_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"CHANNEL_DELETE">> = data;
		client.emit(Constants.EVENTS.CHANNEL_DELETE, new PartialChannel({ id: typed.d.id, name: typed.d.name, type: (typed.d.type === 2 || typed.d.type === 13) ? "voice" : typed.d.type === 1 ? "dm" : "text" }, client));
	} else if (data.t === "CHANNEL_PINS_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"CHANNEL_PINS_UPDATE">> = data;
		client.emit(Constants.EVENTS.CHANNEL_PINS_UPDATE, typed.d);
	} else if (data.t === "CHANNEL_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"CHANNEL_UPDATE">> = data;
		client.emit(Constants.EVENTS.CHANNEL_UPDATE, createChannel(typed.d, client) as any);
	} else if (data.t === "GUILD_BAN_ADD") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_BAN_ADD">> = data;
		client.emit(Constants.EVENTS.GUILD_BAN_ADD, new PartialGuild({ id: typed.d.guild_id }, client), typed.d.user.id === client.user.id ? client.user : new User(typed.d.user, client));
	} else if (data.t === "GUILD_BAN_REMOVE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_BAN_REMOVE">> = data;
		client.emit(Constants.EVENTS.GUILD_BAN_REMOVE, new PartialGuild({ id: typed.d.guild_id }, client), typed.d.user.id === client.user.id ? client.user : new User(typed.d.user, client));
	} else if (data.t === "GUILD_CREATE") {

		if (guildInboundTimeout) {
			clearTimeout(guildInboundTimeout);
			guildInboundTimeout = null;
		}

		if (client.readyAt === null) guildInboundTimeout = setTimeout(() => setReady(client), guildInboundTimeoutDuration);
		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_CREATE">> = data;
		const guild = new Guild(typed.d, client);
		client.emit(Constants.EVENTS.GUILD_CREATE, guild);
	} else if (data.t === "GUILD_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_DELETE">> = data;
		if (typed.d.unavailable) client.emit(Constants.CLIENT_ONLY_EVENTS.GUILD_UNAVAILABLE, new PartialGuild({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
		client.emit(Constants.EVENTS.GUILD_DELETE, new PartialGuild({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
	} else if (data.t === "GUILD_EMOJIS_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_EMOJIS_UPDATE">> = data;
		client.emit(Constants.EVENTS.GUILD_EMOJIS_UPDATE, new PartialGuild({ id: typed.d.guild_id }, client), new Collection(typed.d.emojis.map(e => [e.id || e.name, new Emoji(e, client)])));
	} else if (data.t === "GUILD_MEMBERS_CHUNK") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBERS_CHUNK">> = data;
		client.emit(Constants.EVENTS.GUILD_MEMBERS_CHUNK, new Collection(typed.d.members.map(m => [m.user.id, new GuildMember(m, client)])), new PartialGuild({ id: typed.d.guild_id }, client), { index: typed.d.chunk_index, count: typed.d.chunk_count, nonce: typed.d.nonce || null });
	} else if (data.t === "GUILD_MEMBER_ADD") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBER_ADD">> = data;
		client.emit(Constants.EVENTS.GUILD_MEMBER_ADD, new GuildMember(typed.d, client));
	} else if (data.t === "GUILD_MEMBER_REMOVE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBER_REMOVE">> = data;
		client.emit(Constants.EVENTS.GUILD_MEMBER_REMOVE, new GuildMember({ user: typed.d.user, guild_id: typed.d.guild_id, deaf: false, hoisted_role: typed.d.guild_id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [] }, client));
	} else if (data.t === "GUILD_MEMBER_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBER_UPDATE">> = data;
		if (!typed.d.user) return;
		client.emit(Constants.EVENTS.GUILD_MEMBER_UPDATE, new GuildMember(typed.d, client));
	} else if (data.t === "GUILD_ROLE_CREATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_ROLE_CREATE">> = data;
		client.emit(Constants.EVENTS.GUILD_ROLE_CREATE, new Role({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
	} else if (data.t === "GUILD_ROLE_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_ROLE_DELETE">> = data;

		client.emit(Constants.EVENTS.GUILD_ROLE_DELETE, new PartialRole({ id: typed.d.role_id, guild_id: typed.d.guild_id }, client));
	} else if (data.t === "GUILD_ROLE_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_ROLE_UPDATE">> = data;
		client.emit(Constants.EVENTS.GUILD_ROLE_UPDATE, new Role({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
	} else if (data.t === "GUILD_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"GUILD_UPDATE">> = data;
		client.emit(Constants.EVENTS.GUILD_UPDATE, new Guild(typed.d, client));
	} else if (data.op === 9) {

		client.emit(Constants.EVENTS.INVALID_SESSION);
	} else if (data.t === "INVITE_CREATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"INVITE_CREATE">> = data;
		client.emit(Constants.EVENTS.INVITE_CREATE, new Invite(typed.d as any, client));
	} else if (data.t === "INVITE_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"INVITE_DELETE">> = data;
		client.emit(Constants.EVENTS.INVITE_DELETE, new Invite(typed.d as any, client));
	} else if (data.t === "MESSAGE_CREATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_CREATE">> = data;
		if (typed.d.author.id === client.user.id) client.user._patch(typed.d.author);
		client.emit(Constants.EVENTS.MESSAGE_CREATE, new Message(typed.d, client));
	} else if (data.t === "MESSAGE_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_DELETE">> = data;
		client.emit(Constants.EVENTS.MESSAGE_DELETE, new PartialMessage(typed.d, client));
	} else if (data.t === "MESSAGE_DELETE_BULK") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_DELETE_BULK">> = data;
		client.emit(Constants.EVENTS.MESSAGE_DELETE_BULK, new Collection(typed.d.ids.map(id => [id, new PartialMessage({ id: id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client)])));
	} else if (data.t === "MESSAGE_REACTION_ADD") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_REACTION_ADD">> = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_ADD, new MessageReaction(new PartialMessage({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 1, typed.d.user_id === client.user.id), new PartialUser({ id: typed.d.user_id }, client));
	} else if (data.t === "MESSAGE_REACTION_REMOVE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_REACTION_REMOVE">> = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE, new MessageReaction(new PartialMessage({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 0, typed.d.user_id === client.user.id), new PartialUser({ id: typed.d.user_id }, client));
	} else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_REACTION_REMOVE_ALL">> = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE_ALL, new PartialMessage({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client));
	} else if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_REACTION_REMOVE_EMOJI">> = data;
		client.emit(Constants.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, new MessageReaction(new PartialMessage({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 0, false));
	} else if (data.t === "MESSAGE_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"MESSAGE_UPDATE">> = data;
		client.emit(Constants.EVENTS.MESSAGE_UPDATE, new Message(typed.d, client));
	} else if (data.t === "RECONNECT") {

		client.emit(Constants.CLIENT_ONLY_EVENTS.SHARD_DISCONNECT, { code: 1001, reason: "Server is going away", wasClean: true }, data.shard_id);
	} else if (data.t === "RESUMED") {

		client.emit(Constants.EVENTS.RESUMED, data.shard_id);
	} else if (data.t === "THREAD_CREATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_CREATE">> = data;
		client.emit(Constants.EVENTS.THREAD_CREATE, typed.d.type === 10 ? new ThreadNewsChannel(typed.d, client) : new ThreadTextChannel(typed.d, client));
	} else if (data.t === "THREAD_DELETE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_DELETE">> = data;
		client.emit(Constants.EVENTS.THREAD_DELETE, typed.d.type === 10 ? new ThreadNewsChannel(typed.d, client) : new ThreadTextChannel(typed.d, client));
	} else if (data.t === "THREAD_LIST_SYNC") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_LIST_SYNC">> = data;
		client.emit(Constants.EVENTS.THREAD_LIST_SYNC, new PartialGuild({ id: typed.d.guild_id }, client), new Collection((typed.d.channel_ids || []).map(id => [id, new PartialChannel({ id: id, guild_id: typed.d.guild_id }, client)])), new Collection(typed.d.threads.map(thread => {
			const channel = thread.type === 10 ? new ThreadNewsChannel(thread, client) : new ThreadTextChannel(thread, client);
			const members = typed.d.members.filter(m => m.id === channel.id);
			for (const member of members) channel.members.set(member.user_id, new ThreadMember(channel, member));
			return [channel.id, channel];
		})));
	} else if (data.t === "THREAD_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_UPDATE">> = data;
		client.emit(Constants.EVENTS.THREAD_UPDATE, typed.d.type === 10 ? new ThreadNewsChannel(typed.d, client) : new ThreadTextChannel(typed.d, client));
	} else if (data.t === "THREAD_MEMBER_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_MEMBER_UPDATE">> = data;
		client.emit(Constants.EVENTS.THREAD_MEMBER_UPDATE, new ThreadMember(new PartialThreadChannel({ id: typed.d.id }, client), typed.d));
	} else if (data.t === "THREAD_MEMBERS_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"THREAD_MEMBERS_UPDATE">> = data;
		const thread = new PartialThreadChannel({ id: typed.d.id, guild_id: typed.d.guild_id, number: typed.d.member_count }, client);
		client.emit(Constants.EVENTS.THREAD_MEMBERS_UPDATE, thread, { added: new Collection((typed.d.added_members || []).map(m => [m.user_id, new ThreadMember(thread, m)])), removed: new Collection((typed.d.removed_member_ids || []).map(i => [i, new PartialUser({ id: i }, client)])) });
	} else if (data.t === "TYPING_START") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"TYPING_START">> = data;
		client.emit(Constants.EVENTS.TYPING_START, new PartialChannel({ id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), new PartialUser({ id: typed.d.user_id }, client));
	} else if (data.t === "USER_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"USER_UPDATE">> = data;
		if (typed.d.id === client.user.id) client.user._patch(typed.d);
		client.emit(Constants.EVENTS.USER_UPDATE, typed.d.id === client.user.id ? client.user : new User(typed.d, client));
	} else if (data.t === "VOICE_STATE_UPDATE") {

		// @ts-ignore
		const typed: Required<import("./internal").InboundDataType<"VOICE_STATE_UPDATE">> = data;
		const voicestate = new VoiceState(typed.d, client);
		client.emit(Constants.EVENTS.VOICE_STATE_UPDATE, voicestate);
	}
}

export = handle;
