"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("./util/Constants"));
const Collection_1 = __importDefault(require("./util/Collection"));
const ClientApplication_1 = __importDefault(require("./structures/ClientApplication"));
const ClientUser_1 = __importDefault(require("./structures/ClientUser"));
const CommandInteraction_1 = __importDefault(require("./structures/CommandInteraction"));
const Guild_1 = __importDefault(require("./structures/Guild"));
const GuildMember_1 = __importDefault(require("./structures/GuildMember"));
const Interaction_1 = __importDefault(require("./structures/Interaction"));
const MessageComponentInteraction_1 = __importDefault(require("./structures/MessageComponentInteraction"));
const ThreadMember_1 = __importDefault(require("./structures/ThreadMember"));
const ThreadNewsChannel_1 = __importDefault(require("./structures/ThreadNewsChannel"));
const ThreadTextChannel_1 = __importDefault(require("./structures/ThreadTextChannel"));
const PartialChannel_1 = __importDefault(require("./structures/Partial/PartialChannel"));
const PartialGuild_1 = __importDefault(require("./structures/Partial/PartialGuild"));
const PartialThreadChannel_1 = __importDefault(require("./structures/Partial/PartialThreadChannel"));
const PartialUser_1 = __importDefault(require("./structures/Partial/PartialUser"));
let guildInboundTimeout = null;
function setReady(client) {
    client.readyTimestamp = Date.now();
    client.emit("ready", client.user);
    if (guildInboundTimeout)
        clearTimeout(guildInboundTimeout);
    guildInboundTimeout = null;
}
function handle(packet, client) {
    const data = packet;
    if (data.t === "READY") {
        client.emit(Constants_1.default.Events.RAW, data);
        const typed = data;
        if (guildInboundTimeout) {
            clearTimeout(guildInboundTimeout);
            guildInboundTimeout = null;
        }
        if (!client.user)
            client.user = new ClientUser_1.default(client, typed.d.user);
        else
            client.user._patch(typed.d.user);
        if (client.application)
            client.application._patch(typed.d.application);
        else
            client.application = new ClientApplication_1.default(client, typed.d.application);
        if (client.readyAt === null && !guildInboundTimeout)
            guildInboundTimeout = setTimeout(() => setReady(client), client.options.connectTimeout || 5000);
        client.emit(Constants_1.default.Events.SHARD_READY, data.shard_id, new Set(typed.d.guilds.filter(g => g.unavailable).map(g => g.id) || []));
    }
    if (!client.user)
        return;
    if (data.t !== "READY")
        client.emit(Constants_1.default.Events.RAW, data);
    if (data.t === "CHANNEL_CREATE") {
        client.actions.ChannelCreate.handle(data.d);
    }
    else if (data.t === "CHANNEL_DELETE") {
        client.actions.ChannelDelete.handle(data.d);
    }
    else if (data.t === "CHANNEL_PINS_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.Events.CHANNEL_PINS_UPDATE, new PartialChannel_1.default(client, { id: typed.d.channel_id, guild_id: typed.d.guild_id, type: typed.d.guild_id ? "text" : "dm" }), new Date(typed.d.last_pin_timestamp));
    }
    else if (data.t === "CHANNEL_UPDATE") {
        client.actions.ChannelDelete.handle(data.d);
    }
    else if (data.t === "GUILD_BAN_ADD") {
        client.actions.GuildBanAdd.handle(data.d);
    }
    else if (data.t === "GUILD_BAN_REMOVE") {
        client.actions.GuildBanRemove.handle(data.d);
    }
    else if (data.t === "GUILD_CREATE") {
        if (guildInboundTimeout) {
            clearTimeout(guildInboundTimeout);
            guildInboundTimeout = null;
        }
        if (client.readyAt === null)
            guildInboundTimeout = setTimeout(() => setReady(client), client.options.connectTimeout || 5000);
        const typed = data;
        const guild = new Guild_1.default(client, typed.d);
        client.emit(Constants_1.default.Events.GUILD_CREATE, guild);
    }
    else if (data.t === "GUILD_DELETE") {
        client.actions.GuildDelete.handle(data.d);
    }
    else if (data.t === "GUILD_EMOJIS_UPDATE") {
        client.actions.GuildEmojisUpdate.handle(data.d);
    }
    else if (data.t === "GUILD_MEMBERS_CHUNK") {
        const typed = data;
        client.emit(Constants_1.default.Events.GUILD_MEMBERS_CHUNK, new Collection_1.default(typed.d.members.map(m => [m.user.id, new GuildMember_1.default(client, m)])), new PartialGuild_1.default(client, { id: typed.d.guild_id }), { index: typed.d.chunk_index, count: typed.d.chunk_count, nonce: typed.d.nonce || null });
    }
    else if (data.t === "GUILD_MEMBER_ADD") {
        const typed = data;
        client.emit(Constants_1.default.Events.GUILD_MEMBER_ADD, new GuildMember_1.default(client, typed.d));
    }
    else if (data.t === "GUILD_MEMBER_REMOVE") {
        client.actions.GuildMemberRemove.handle(data.d);
    }
    else if (data.t === "GUILD_MEMBER_UPDATE") {
        client.actions.GuildMemberUpdate.handle(data.d);
    }
    else if (data.t === "GUILD_ROLE_CREATE") {
        client.actions.GuildRoleCreate.handle(data.d);
    }
    else if (data.t === "GUILD_ROLE_DELETE") {
        client.actions.GuildRoleDelete.handle(data.d);
    }
    else if (data.t === "GUILD_ROLE_UPDATE") {
        client.actions.GuildRoleUpdate.handle(data.d);
    }
    else if (data.t === "GUILD_UPDATE") {
        client.actions.GuildUpdate.handle(data.d);
    }
    else if (data.t === "INTERACTION_CREATE") {
        const typed = data;
        let interaction;
        if (typed.d.type === 2)
            interaction = new CommandInteraction_1.default(client, typed.d);
        else if (typed.d.type === 3)
            interaction = new MessageComponentInteraction_1.default(client, typed.d);
        else
            interaction = new Interaction_1.default(client, typed.d);
        client.emit(Constants_1.default.Events.INTERACTION_CREATE, interaction);
    }
    else if (data.op === 9) {
        client.emit(Constants_1.default.Events.INVALID_SESSION);
    }
    else if (data.t === "INVITE_CREATE") {
        client.actions.InviteCreate.handle(data.d);
    }
    else if (data.t === "INVITE_DELETE") {
        client.actions.InviteDelete.handle(data.d);
    }
    else if (data.t === "MESSAGE_CREATE") {
        client.actions.MessageCreate.handle(data.d);
    }
    else if (data.t === "MESSAGE_DELETE") {
        client.actions.MessageDelete.handle(data.d);
    }
    else if (data.t === "MESSAGE_DELETE_BULK") {
        client.actions.MessageDeleteBulk.handle(data.d);
    }
    else if (data.t === "MESSAGE_REACTION_ADD") {
        client.actions.MessageReactionAdd.handle(data.d);
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE") {
        client.actions.MessageReactionRemove.handle(data.d);
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        client.actions.MessageReactionRemoveAll.handle(data.d);
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
        client.actions.MessageReactionRemoveEmoji.handle(data.d);
    }
    else if (data.t === "MESSAGE_UPDATE") {
        client.actions.MessageUpdate.handle(data.d);
    }
    else if (data.t === "RECONNECT") {
        client.emit(Constants_1.default.Events.SHARD_DISCONNECT, { code: 1001, reason: "Server is going away", wasClean: true }, data.shard_id);
    }
    else if (data.t === "RESUMED") {
        client.emit(Constants_1.default.Events.RESUMED, data.shard_id);
    }
    else if (data.t === "THREAD_CREATE") {
        const typed = data;
        client.emit(Constants_1.default.Events.THREAD_CREATE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d) : new ThreadTextChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d));
    }
    else if (data.t === "THREAD_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.Events.THREAD_DELETE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d) : new ThreadTextChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d));
    }
    else if (data.t === "THREAD_LIST_SYNC") {
        const typed = data;
        client.emit(Constants_1.default.Events.THREAD_LIST_SYNC, new PartialGuild_1.default(client, { id: typed.d.guild_id }), new Collection_1.default((typed.d.channel_ids || []).map(id => [id, new PartialChannel_1.default(client, { id: id, guild_id: typed.d.guild_id })])), new Collection_1.default(typed.d.threads.map(thread => {
            const channel = thread.type === 10 ? new ThreadNewsChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), thread) : new ThreadTextChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), thread);
            const members = typed.d.members.filter(m => m.id === channel.id);
            for (const member of members)
                channel.members.set(member.user_id, new ThreadMember_1.default(channel, member));
            return [channel.id, channel];
        })));
    }
    else if (data.t === "THREAD_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.Events.THREAD_UPDATE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d) : new ThreadTextChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), typed.d));
    }
    else if (data.t === "THREAD_MEMBER_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.Events.THREAD_MEMBER_UPDATE, new ThreadMember_1.default(new PartialThreadChannel_1.default(new PartialGuild_1.default(client, { id: "UNKNOWN_GUILD" }), { id: typed.d.id }), typed.d));
    }
    else if (data.t === "THREAD_MEMBERS_UPDATE") {
        const typed = data;
        const thread = new PartialThreadChannel_1.default(new PartialGuild_1.default(client, { id: typed.d.guild_id }), { id: typed.d.id, guild_id: typed.d.guild_id, number: typed.d.member_count });
        client.emit(Constants_1.default.Events.THREAD_MEMBERS_UPDATE, thread, { added: new Collection_1.default((typed.d.added_members || []).map(m => [m.user_id, new ThreadMember_1.default(thread, m)])), removed: new Collection_1.default((typed.d.removed_member_ids || []).map(i => [i, new PartialUser_1.default(client, { id: i })])) });
    }
    else if (data.t === "TYPING_START") {
        client.actions.TypingStart.handle(data.d);
    }
    else if (data.t === "USER_UPDATE") {
        client.actions.UserUpdate.handle(data.d);
    }
    else if (data.t === "VOICE_STATE_UPDATE") {
        client.actions.VoiceStateUpdate.handle(data.d);
    }
}
module.exports = handle;
