import Discord from "discord-typings";
declare type ChannelDatas = Discord.DMChannelData | Discord.TextChannelData | Discord.CategoryChannelData | Discord.NewsChannelData | Discord.VoiceChannelData | Discord.StageChannelData;
export interface GatewayEventDataTable {
    CHANNEL_CREATE: ChannelDatas;
    CHANNEL_DELETE: ChannelDatas;
    CHANNEL_PINS_UPDATE: Discord.ChannelPinData;
    CHANNEL_UPDATE: ChannelDatas;
    GUILD_BAN_ADD: Discord.GuildBanAddData;
    GUILD_BAN_REMOVE: Discord.GuildBanRemoveData;
    GUILD_CREATE: Discord.GuildData;
    GUILD_DELETE: Discord.GuildDeleteData;
    GUILD_EMOJIS_UPDATE: Discord.GuildEmojisUpdateData;
    GUILD_INTEGREATIONS_UPDATE: {
        guild_id: string;
    };
    GUILD_MEMBERS_CHUNK: Discord.GuildMembersChunkData;
    GUILD_MEMBER_ADD: Discord.MemberData & {
        guild_id: string;
        user: Discord.UserData;
    };
    GUILD_MEMBER_REMOVE: Discord.GuildMemberRemoveData;
    GUILD_MEMBER_UPDATE: Discord.MemberData & {
        user: Discord.UserData;
    };
    GUILD_ROLE_CREATE: {
        guild_id: string;
        role: Discord.RoleData;
    };
    GUILD_ROLE_DELETE: {
        guild_id: string;
        role_id: string;
    };
    GUILD_ROLE_UPDATE: {
        guild_id: string;
        role: Discord.RoleData;
    };
    GUILD_UPDATE: Discord.GuildData;
    INTERACTION_CREATE: Discord.InteractionData;
    INVITE_CREATE: Discord.InviteCreateData;
    INVITE_DELETE: Discord.InviteDeleteData;
    MESSAGE_CREATE: Discord.MessageData;
    MESSAGE_DELETE: Discord.MessageDeleteData;
    MESSAGE_DELETE_BULK: Discord.MessageBulkDeleteData;
    MESSAGE_REACTION_ADD: Discord.MessageReactionAddData;
    MESSAGE_REACTION_REMOVE: Discord.MessageReactionRemoveData;
    MESSAGE_REACTION_REMOVE_ALL: Discord.MessageReactionRemoveAllData;
    MESSAGE_REACTION_REMOVE_EMOJI: Discord.MessageReactionRemoveEmojiData;
    MESSAGE_UPDATE: Discord.MessageData;
    PRESENCE_UPDATE: Discord.PresenceUpdateData;
    RECONNECT: false;
    RESUMED: Discord.ResumeData;
    READY: Discord.ReadyData;
    THREAD_CREATE: Discord.ThreadChannelData;
    THREAD_DELETE: Discord.ThreadChannelData;
    THREAD_LIST_SYNC: Discord.ThreadListSyncData;
    THREAD_UPDATE: Discord.ThreadChannelData;
    THREAD_MEMBER_UPDATE: Discord.ThreadMemberData;
    THREAD_MEMBERS_UPDATE: Discord.ThreadMembersUpdateData;
    TYPING_START: Discord.TypingStartData;
    USER_UPDATE: Discord.UserData;
    VOICE_STATE_UPDATE: Discord.VoiceStateData;
    VOICE_SERVER_UPDATE: Discord.VoiceServerUpdateData;
}
export interface InboundDataType<E extends keyof GatewayEventDataTable> {
    d?: GatewayEventDataTable[E];
    op: number;
    s?: number;
    t?: E;
    shard_id: number;
}
export interface PartialData {
    id: Discord.Snowflake;
    guild_id?: Discord.Snowflake;
    channel_id?: Discord.Snowflake;
    number?: number;
    type?: import("./Types").ChannelType;
    name?: string;
    permissions?: string;
    topic?: string;
}
export declare type HTTPMethodSignature = (data?: RestOptions) => Promise<any>;
export declare type HTTPMethodsObject = {
    get: HTTPMethodSignature;
    post: HTTPMethodSignature;
    delete: HTTPMethodSignature;
    patch: HTTPMethodSignature;
    put: HTTPMethodSignature;
};
export declare type Route = ((...routeParams: Array<any>) => Route) & RouteObject;
export declare type RouteObject = HTTPMethodsObject & {
    [route: string]: Route;
};
export declare type RestOptions = {
    route?: string;
    data?: any;
    auth?: boolean;
    versioned?: boolean;
    query?: {
        [qs: string]: any;
    };
    reason?: string;
    headers?: {
        [header: string]: any;
    };
    files?: Array<any>;
};
export {};
