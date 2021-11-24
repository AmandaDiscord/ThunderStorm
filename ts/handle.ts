import Constants from "./util/Constants";

import { Collection } from "@discordjs/collection";

import ClientApplication from "./structures/ClientApplication";
import ClientUser from "./structures/ClientUser";
import Guild from "./structures/Guild";
import GuildMember from "./structures/GuildMember";
import ThreadMember from "./structures/ThreadMember";
import ThreadNewsChannel from "./structures/ThreadNewsChannel";
import ThreadTextChannel from "./structures/ThreadTextChannel";

import PartialChannel from "./structures/Partial/PartialChannel";
import PartialGuild from "./structures/Partial/PartialGuild";
import PartialThreadChannel from "./structures/Partial/PartialThreadChannel";
import PartialUser from "./structures/Partial/PartialUser";

function setReady(client: import("./client/Client")) {
	client.readyTimestamp = Date.now();
	client.emit(Constants.Events.CLIENT_READY, client.user as import("./structures/ClientUser"));
}

function handle(packet: any, client: import("./client/Client")) {
	const data = packet;
	client.emit(Constants.Events.RAW, data);
	if (data.t === "READY") {
		const typed: Required<import("./internal").InboundDataType<"READY">> = data;
		if (!client.user) client.user = new ClientUser(client, typed.d.user);
		else client.user._patch(typed.d.user);
		if (client.application) client.application._patch(typed.d.application as any);
		else client.application = new ClientApplication(client, typed.d.application as any);
		if (!client.readyTimestamp) setReady(client);
		client.emit(Constants.Events.SHARD_READY, data.shard_id, new Set(typed.d.guilds.filter(g => g.unavailable).map(g => g.id) || []));
	}

	if (!client.user) return;
	if (data.t === "CHANNEL_CREATE") {
		client.actions.ChannelCreate.handle(data.d);
	} else if (data.t === "CHANNEL_DELETE") {
		client.actions.ChannelDelete.handle(data.d);
	} else if (data.t === "CHANNEL_PINS_UPDATE") {
		const typed: Required<import("./internal").InboundDataType<"CHANNEL_PINS_UPDATE">> = data;
		client.emit(Constants.Events.CHANNEL_PINS_UPDATE, new PartialChannel(client, { id: typed.d.channel_id, guild_id: typed.d.guild_id, type: typed.d.guild_id ? Constants.ChannelTypes[0] : Constants.ChannelTypes[1] }), new Date(typed.d.last_pin_timestamp));
	} else if (data.t === "CHANNEL_UPDATE") {
		client.actions.ChannelDelete.handle(data.d);
	} else if (data.t === "GUILD_BAN_ADD") {
		client.actions.GuildBanAdd.handle(data.d);
	} else if (data.t === "GUILD_BAN_REMOVE") {
		client.actions.GuildBanRemove.handle(data.d);
	} else if (data.t === "GUILD_CREATE") {
		const typed: Required<import("./internal").InboundDataType<"GUILD_CREATE">> = data;
		const guild = new Guild(client, typed.d);
		client.emit(Constants.Events.GUILD_CREATE, guild);
	} else if (data.t === "GUILD_DELETE") {
		client.actions.GuildDelete.handle(data.d);
	} else if (data.t === "GUILD_EMOJIS_UPDATE") {
		client.actions.GuildEmojisUpdate.handle(data.d);
	} else if (data.t === "GUILD_MEMBERS_CHUNK") {
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBERS_CHUNK">> = data;
		client.emit(Constants.Events.GUILD_MEMBERS_CHUNK, new Collection(typed.d.members.map(m => [m.user.id, new GuildMember(client, m)])), new PartialGuild(client, { id: typed.d.guild_id }), { index: typed.d.chunk_index, count: typed.d.chunk_count, nonce: typed.d.nonce || null });
	} else if (data.t === "GUILD_MEMBER_ADD") {
		const typed: Required<import("./internal").InboundDataType<"GUILD_MEMBER_ADD">> = data;
		client.emit(Constants.Events.GUILD_MEMBER_ADD, new GuildMember(client, typed.d));
	} else if (data.t === "GUILD_MEMBER_REMOVE") {
		client.actions.GuildMemberRemove.handle(data.d);
	} else if (data.t === "GUILD_MEMBER_UPDATE") {
		client.actions.GuildMemberUpdate.handle(data.d);
	} else if (data.t === "GUILD_ROLE_CREATE") {
		client.actions.GuildRoleCreate.handle(data.d);
	} else if (data.t === "GUILD_ROLE_DELETE") {
		client.actions.GuildRoleDelete.handle(data.d);
	} else if (data.t === "GUILD_ROLE_UPDATE") {
		client.actions.GuildRoleUpdate.handle(data.d);
	} else if (data.t === "GUILD_UPDATE") {
		client.actions.GuildUpdate.handle(data.d);
	} else if (data.t === "INTERACTION_CREATE") {
		client.actions.InteractionCreate.handle(data.d);
	} else if (data.t === "INVITE_CREATE") {
		client.actions.InviteCreate.handle(data.d);
	} else if (data.t === "INVITE_DELETE") {
		client.actions.InviteDelete.handle(data.d);
	} else if (data.t === "MESSAGE_CREATE") {
		client.actions.MessageCreate.handle(data.d);
	} else if (data.t === "MESSAGE_DELETE") {
		client.actions.MessageDelete.handle(data.d);
	} else if (data.t === "MESSAGE_DELETE_BULK") {
		client.actions.MessageDeleteBulk.handle(data.d);
	} else if (data.t === "MESSAGE_REACTION_ADD") {
		client.actions.MessageReactionAdd.handle(data.d);
	} else if (data.t === "MESSAGE_REACTION_REMOVE") {
		client.actions.MessageReactionRemove.handle(data.d);
	} else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
		client.actions.MessageReactionRemoveAll.handle(data.d);
	} else if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
		client.actions.MessageReactionRemoveEmoji.handle(data.d);
	} else if (data.t === "MESSAGE_UPDATE") {
		client.actions.MessageUpdate.handle(data.d);
	} else if (data.t === "RECONNECT") {
		client.emit(Constants.Events.SHARD_DISCONNECT, { code: 1001, reason: "Server is going away", wasClean: true }, data.shard_id);
	} else if (data.t === "THREAD_CREATE") {
		client.actions.ThreadCreate.handle(data.d);
	} else if (data.t === "THREAD_DELETE") {
		client.actions.ThreadDelete.handle(data.d);
	} else if (data.t === "THREAD_LIST_SYNC") {
		client.actions.ThreadListSync.handle(data.d);
	} else if (data.t === "THREAD_UPDATE") {
		const typed: Required<import("./internal").InboundDataType<"THREAD_UPDATE">> = data;
		client.emit(Constants.Events.THREAD_UPDATE, typed.d.type === 10 ? new ThreadNewsChannel(new PartialGuild(client, { id: typed.d.guild_id }), typed.d) : new ThreadTextChannel(new PartialGuild(client, { id: typed.d.guild_id }), typed.d));
	} else if (data.t === "THREAD_MEMBER_UPDATE") {
		const typed: Required<import("./internal").InboundDataType<"THREAD_MEMBER_UPDATE">> = data;
		client.emit(Constants.Events.THREAD_MEMBER_UPDATE, new ThreadMember(new PartialThreadChannel(new PartialGuild(client, { id: "UNKNOWN_GUILD" }), { id: typed.d.id as string }), typed.d));
	} else if (data.t === "THREAD_MEMBERS_UPDATE") {
		const typed: Required<import("./internal").InboundDataType<"THREAD_MEMBERS_UPDATE">> = data;
		const thread = new PartialThreadChannel(new PartialGuild(client, { id: typed.d.guild_id }), { id: typed.d.id, guild_id: typed.d.guild_id, number: typed.d.member_count });
		client.emit(Constants.Events.THREAD_MEMBERS_UPDATE, thread, { added: new Collection((typed.d.added_members || []).map(m => [m.user_id as string, new ThreadMember(thread, m)])), removed: new Collection((typed.d.removed_member_ids || []).map(i => [i, new PartialUser(client, { id: i })])) });
	} else if (data.t === "TYPING_START") {
		client.actions.TypingStart.handle(data.d);
	} else if (data.t === "USER_UPDATE") {
		client.actions.UserUpdate.handle(data.d);
	} else if (data.t === "VOICE_STATE_UPDATE") {
		client.actions.VoiceStateUpdate.handle(data.d);
	}
}

export = handle;

exports.default = handle;
