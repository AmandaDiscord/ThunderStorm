"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("./Constants"));
const Collection_1 = __importDefault(require("./structures/Util/Collection"));
const CategoryChannel_1 = __importDefault(require("./structures/CategoryChannel"));
const Channel_1 = __importDefault(require("./structures/Channel"));
const ClientUser_1 = __importDefault(require("./structures/ClientUser"));
const DMChannel_1 = __importDefault(require("./structures/DMChannel"));
const Emoji_1 = __importDefault(require("./structures/Emoji"));
const Guild_1 = __importDefault(require("./structures/Guild"));
const GuildMember_1 = __importDefault(require("./structures/GuildMember"));
const Invite_1 = __importDefault(require("./structures/Invite"));
const Message_1 = __importDefault(require("./structures/Message"));
const MessageReaction_1 = __importDefault(require("./structures/MessageReaction"));
const NewsChannel_1 = __importDefault(require("./structures/NewsChannel"));
const Role_1 = __importDefault(require("./structures/Role"));
const StageChannel_1 = __importDefault(require("./structures/StageChannel"));
const TextChannel_1 = __importDefault(require("./structures/TextChannel"));
const ThreadMember_1 = __importDefault(require("./structures/ThreadMember"));
const ThreadNewsChannel_1 = __importDefault(require("./structures/ThreadNewsChannel"));
const ThreadTextChannel_1 = __importDefault(require("./structures/ThreadTextChannel"));
const User_1 = __importDefault(require("./structures/User"));
const VoiceChannel_1 = __importDefault(require("./structures/VoiceChannel"));
const VoiceState_1 = __importDefault(require("./structures/VoiceState"));
const PartialChannel_1 = __importDefault(require("./structures/Partial/PartialChannel"));
const PartialGuild_1 = __importDefault(require("./structures/Partial/PartialGuild"));
const PartialMessage_1 = __importDefault(require("./structures/Partial/PartialMessage"));
const PartialRole_1 = __importDefault(require("./structures/Partial/PartialRole"));
const PartialThreadChannel_1 = __importDefault(require("./structures/Partial/PartialThreadChannel"));
const PartialUser_1 = __importDefault(require("./structures/Partial/PartialUser"));
let guildInboundTimeout = null;
const guildInboundTimeoutDuration = 5000;
function setReady(client) {
    client.readyTimestamp = Date.now();
    client.emit("ready", client.user);
    if (guildInboundTimeout)
        clearTimeout(guildInboundTimeout);
    guildInboundTimeout = null;
}
function createChannel(channel, client) {
    let chan;
    if (channel.type === 0)
        chan = new TextChannel_1.default(channel, client);
    else if (channel.type === 1)
        chan = new DMChannel_1.default(channel, client);
    else if (channel.type === 2)
        chan = new VoiceChannel_1.default(channel, client);
    else if (channel.type === 4)
        chan = new CategoryChannel_1.default(channel, client);
    else if (channel.type === 5)
        chan = new NewsChannel_1.default(channel, client);
    else if (channel.type === 13)
        chan = new StageChannel_1.default(channel, client);
    else
        chan = new Channel_1.default(channel, client);
    return chan;
}
function handle(data, client) {
    if (data.t === "READY") {
        client.emit(Constants_1.default.CLIENT_ONLY_EVENTS.RAW, data);
        const typed = data;
        if (!client.user)
            client.user = new ClientUser_1.default(typed.d.user, client);
        else
            client.user._patch(typed.d.user);
        if (client.readyAt === null && !guildInboundTimeout)
            guildInboundTimeout = setTimeout(() => setReady(client), guildInboundTimeoutDuration);
        client.emit(Constants_1.default.EVENTS.SHARD_READY, data.shard_id, new Set(typed.d.guilds.filter(g => g.unavailable).map(g => g.id) || []));
    }
    if (!client.user)
        return;
    if (data.t !== "READY")
        client.emit(Constants_1.default.CLIENT_ONLY_EVENTS.RAW, data);
    if (data.t === "CHANNEL_CREATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.CHANNEL_CREATE, createChannel(typed.d, client));
    }
    else if (data.t === "CHANNEL_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.CHANNEL_DELETE, new PartialChannel_1.default({ id: typed.d.id, name: typed.d.name, type: (typed.d.type === 2 || typed.d.type === 13) ? "voice" : typed.d.type === 1 ? "dm" : "text" }, client));
    }
    else if (data.t === "CHANNEL_PINS_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.CHANNEL_PINS_UPDATE, typed.d);
    }
    else if (data.t === "CHANNEL_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.CHANNEL_UPDATE, createChannel(typed.d, client));
    }
    else if (data.t === "GUILD_BAN_ADD") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_BAN_ADD, new PartialGuild_1.default({ id: typed.d.guild_id }, client), typed.d.user.id === client.user.id ? client.user : new User_1.default(typed.d.user, client));
    }
    else if (data.t === "GUILD_BAN_REMOVE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_BAN_REMOVE, new PartialGuild_1.default({ id: typed.d.guild_id }, client), typed.d.user.id === client.user.id ? client.user : new User_1.default(typed.d.user, client));
    }
    else if (data.t === "GUILD_CREATE") {
        if (guildInboundTimeout) {
            clearTimeout(guildInboundTimeout);
            guildInboundTimeout = null;
        }
        if (client.readyAt === null)
            guildInboundTimeout = setTimeout(() => setReady(client), guildInboundTimeoutDuration);
        const typed = data;
        const guild = new Guild_1.default(typed.d, client);
        client.emit(Constants_1.default.EVENTS.GUILD_CREATE, guild);
    }
    else if (data.t === "GUILD_DELETE") {
        const typed = data;
        if (typed.d.unavailable)
            client.emit(Constants_1.default.CLIENT_ONLY_EVENTS.GUILD_UNAVAILABLE, new PartialGuild_1.default({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
        client.emit(Constants_1.default.EVENTS.GUILD_DELETE, new PartialGuild_1.default({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
    }
    else if (data.t === "GUILD_EMOJIS_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_EMOJIS_UPDATE, new PartialGuild_1.default({ id: typed.d.guild_id }, client), new Collection_1.default(typed.d.emojis.map(e => [e.id || e.name, new Emoji_1.default(e, client)])));
    }
    else if (data.t === "GUILD_MEMBERS_CHUNK") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_MEMBERS_CHUNK, new Collection_1.default(typed.d.members.map(m => [m.user.id, new GuildMember_1.default(m, client)])), new PartialGuild_1.default({ id: typed.d.guild_id }, client), { index: typed.d.chunk_index, count: typed.d.chunk_count, nonce: typed.d.nonce || null });
    }
    else if (data.t === "GUILD_MEMBER_ADD") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_MEMBER_ADD, new GuildMember_1.default(typed.d, client));
    }
    else if (data.t === "GUILD_MEMBER_REMOVE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_MEMBER_REMOVE, new GuildMember_1.default({ user: typed.d.user, guild_id: typed.d.guild_id, deaf: false, hoisted_role: typed.d.guild_id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [] }, client));
    }
    else if (data.t === "GUILD_MEMBER_UPDATE") {
        const typed = data;
        if (!typed.d.user)
            return;
        client.emit(Constants_1.default.EVENTS.GUILD_MEMBER_UPDATE, new GuildMember_1.default(typed.d, client));
    }
    else if (data.t === "GUILD_ROLE_CREATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_ROLE_CREATE, new Role_1.default({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
    }
    else if (data.t === "GUILD_ROLE_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_ROLE_DELETE, new PartialRole_1.default({ id: typed.d.role_id, guild_id: typed.d.guild_id }, client));
    }
    else if (data.t === "GUILD_ROLE_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_ROLE_UPDATE, new Role_1.default({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
    }
    else if (data.t === "GUILD_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.GUILD_UPDATE, new Guild_1.default(typed.d, client));
    }
    else if (data.op === 9) {
        client.emit(Constants_1.default.EVENTS.INVALID_SESSION);
    }
    else if (data.t === "INVITE_CREATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.INVITE_CREATE, new Invite_1.default(typed.d, client));
    }
    else if (data.t === "INVITE_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.INVITE_DELETE, new Invite_1.default(typed.d, client));
    }
    else if (data.t === "MESSAGE_CREATE") {
        const typed = data;
        if (typed.d.author.id === client.user.id)
            client.user._patch(typed.d.author);
        client.emit(Constants_1.default.EVENTS.MESSAGE_CREATE, new Message_1.default(typed.d, client));
    }
    else if (data.t === "MESSAGE_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_DELETE, new PartialMessage_1.default(typed.d, client));
    }
    else if (data.t === "MESSAGE_DELETE_BULK") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_DELETE_BULK, new Collection_1.default(typed.d.ids.map(id => [id, new PartialMessage_1.default({ id: id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client)])));
    }
    else if (data.t === "MESSAGE_REACTION_ADD") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_REACTION_ADD, new MessageReaction_1.default(new PartialMessage_1.default({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 1, typed.d.user_id === client.user.id), new PartialUser_1.default({ id: typed.d.user_id }, client));
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_REACTION_REMOVE, new MessageReaction_1.default(new PartialMessage_1.default({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 0, typed.d.user_id === client.user.id), new PartialUser_1.default({ id: typed.d.user_id }, client));
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_REACTION_REMOVE_ALL, new PartialMessage_1.default({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client));
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, new MessageReaction_1.default(new PartialMessage_1.default({ id: typed.d.message_id, channel_id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), typed.d.emoji, 0, false));
    }
    else if (data.t === "MESSAGE_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.MESSAGE_UPDATE, new Message_1.default(typed.d, client));
    }
    else if (data.t === "RECONNECT") {
        client.emit(Constants_1.default.CLIENT_ONLY_EVENTS.SHARD_DISCONNECT, { code: 1001, reason: "Server is going away", wasClean: true }, data.shard_id);
    }
    else if (data.t === "RESUMED") {
        client.emit(Constants_1.default.EVENTS.RESUMED, data.shard_id);
    }
    else if (data.t === "THREAD_CREATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.THREAD_CREATE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(typed.d, client) : new ThreadTextChannel_1.default(typed.d, client));
    }
    else if (data.t === "THREAD_DELETE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.THREAD_DELETE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(typed.d, client) : new ThreadTextChannel_1.default(typed.d, client));
    }
    else if (data.t === "THREAD_LIST_SYNC") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.THREAD_LIST_SYNC, new PartialGuild_1.default({ id: typed.d.guild_id }, client), new Collection_1.default((typed.d.channel_ids || []).map(id => [id, new PartialChannel_1.default({ id: id, guild_id: typed.d.guild_id }, client)])), new Collection_1.default(typed.d.threads.map(thread => {
            const channel = thread.type === 10 ? new ThreadNewsChannel_1.default(thread, client) : new ThreadTextChannel_1.default(thread, client);
            const members = typed.d.members.filter(m => m.id === channel.id);
            for (const member of members)
                channel.members.set(member.user_id, new ThreadMember_1.default(channel, member));
            return [channel.id, channel];
        })));
    }
    else if (data.t === "THREAD_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.THREAD_UPDATE, typed.d.type === 10 ? new ThreadNewsChannel_1.default(typed.d, client) : new ThreadTextChannel_1.default(typed.d, client));
    }
    else if (data.t === "THREAD_MEMBER_UPDATE") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.THREAD_MEMBER_UPDATE, new ThreadMember_1.default(new PartialThreadChannel_1.default({ id: typed.d.id }, client), typed.d));
    }
    else if (data.t === "THREAD_MEMBERS_UPDATE") {
        const typed = data;
        const thread = new PartialThreadChannel_1.default({ id: typed.d.id, guild_id: typed.d.guild_id, number: typed.d.member_count }, client);
        client.emit(Constants_1.default.EVENTS.THREAD_MEMBERS_UPDATE, thread, { added: new Collection_1.default((typed.d.added_members || []).map(m => [m.user_id, new ThreadMember_1.default(thread, m)])), removed: new Collection_1.default((typed.d.removed_member_ids || []).map(i => [i, new PartialUser_1.default({ id: i }, client)])) });
    }
    else if (data.t === "TYPING_START") {
        const typed = data;
        client.emit(Constants_1.default.EVENTS.TYPING_START, new PartialChannel_1.default({ id: typed.d.channel_id, guild_id: typed.d.guild_id }, client), new PartialUser_1.default({ id: typed.d.user_id }, client));
    }
    else if (data.t === "USER_UPDATE") {
        const typed = data;
        if (typed.d.id === client.user.id)
            client.user._patch(typed.d);
        client.emit(Constants_1.default.EVENTS.USER_UPDATE, typed.d.id === client.user.id ? client.user : new User_1.default(typed.d, client));
    }
    else if (data.t === "VOICE_STATE_UPDATE") {
        const typed = data;
        const voicestate = new VoiceState_1.default(typed.d, client);
        client.emit(Constants_1.default.EVENTS.VOICE_STATE_UPDATE, voicestate);
    }
}
module.exports = handle;
