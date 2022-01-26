import BitField from "./BitField";
interface PermissionsConstructor {
    new (bits?: import("../Types").PermissionResolvable): Permissions;
    readonly prototype: Permissions;
    readonly [Symbol.species]: PermissionsConstructor;
}
declare const FLAGS: {
    CREATE_INSTANT_INVITE: bigint;
    KICK_MEMBERS: bigint;
    BAN_MEMBERS: bigint;
    ADMINISTRATOR: bigint;
    MANAGE_CHANNELS: bigint;
    MANAGE_GUILD: bigint;
    ADD_REACTIONS: bigint;
    VIEW_AUDIT_LOG: bigint;
    PRIORITY_SPEAKER: bigint;
    STREAM: bigint;
    VIEW_CHANNEL: bigint;
    SEND_MESSAGES: bigint;
    SEND_TTS_MESSAGES: bigint;
    MANAGE_MESSAGES: bigint;
    EMBED_LINKS: bigint;
    ATTACH_FILES: bigint;
    READ_MESSAGE_HISTORY: bigint;
    MENTION_EVERYONE: bigint;
    USE_EXTERNAL_EMOJIS: bigint;
    VIEW_GUILD_INSIGHTS: bigint;
    CONNECT: bigint;
    SPEAK: bigint;
    MUTE_MEMBERS: bigint;
    DEAFEN_MEMBERS: bigint;
    MOVE_MEMBERS: bigint;
    USE_VAD: bigint;
    CHANGE_NICKNAME: bigint;
    MANAGE_NICKNAMES: bigint;
    MANAGE_ROLES: bigint;
    MANAGE_WEBHOOKS: bigint;
    MANAGE_EMOJIS: bigint;
    USE_APPLICATION_COMMANDS: bigint;
    REQUEST_TO_SPEAK: bigint;
    MANAGE_THREADS: bigint;
    CREATE_PUBLIC_THREADS: bigint;
    CREATE_PRIVATE_THREADS: bigint;
    USE_EXTERNAL_STICKERS: bigint;
    SEND_MESSAGES_IN_THREADS: bigint;
    START_EMBEDDED_ACTIVITIES: bigint;
};
declare class Permissions extends BitField<typeof FLAGS> {
    ["constructor"]: typeof Permissions;
    static readonly default: typeof Permissions;
    readonly [Symbol.species]: PermissionsConstructor;
    static FLAGS: {
        CREATE_INSTANT_INVITE: bigint;
        KICK_MEMBERS: bigint;
        BAN_MEMBERS: bigint;
        ADMINISTRATOR: bigint;
        MANAGE_CHANNELS: bigint;
        MANAGE_GUILD: bigint;
        ADD_REACTIONS: bigint;
        VIEW_AUDIT_LOG: bigint;
        PRIORITY_SPEAKER: bigint;
        STREAM: bigint;
        VIEW_CHANNEL: bigint;
        SEND_MESSAGES: bigint;
        SEND_TTS_MESSAGES: bigint;
        MANAGE_MESSAGES: bigint;
        EMBED_LINKS: bigint;
        ATTACH_FILES: bigint;
        READ_MESSAGE_HISTORY: bigint;
        MENTION_EVERYONE: bigint;
        USE_EXTERNAL_EMOJIS: bigint;
        VIEW_GUILD_INSIGHTS: bigint;
        CONNECT: bigint;
        SPEAK: bigint;
        MUTE_MEMBERS: bigint;
        DEAFEN_MEMBERS: bigint;
        MOVE_MEMBERS: bigint;
        USE_VAD: bigint;
        CHANGE_NICKNAME: bigint;
        MANAGE_NICKNAMES: bigint;
        MANAGE_ROLES: bigint;
        MANAGE_WEBHOOKS: bigint;
        MANAGE_EMOJIS: bigint;
        USE_APPLICATION_COMMANDS: bigint;
        REQUEST_TO_SPEAK: bigint;
        MANAGE_THREADS: bigint;
        CREATE_PUBLIC_THREADS: bigint;
        CREATE_PRIVATE_THREADS: bigint;
        USE_EXTERNAL_STICKERS: bigint;
        SEND_MESSAGES_IN_THREADS: bigint;
        START_EMBEDDED_ACTIVITIES: bigint;
    };
    FLAGS: {
        CREATE_INSTANT_INVITE: bigint;
        KICK_MEMBERS: bigint;
        BAN_MEMBERS: bigint;
        ADMINISTRATOR: bigint;
        MANAGE_CHANNELS: bigint;
        MANAGE_GUILD: bigint;
        ADD_REACTIONS: bigint;
        VIEW_AUDIT_LOG: bigint;
        PRIORITY_SPEAKER: bigint;
        STREAM: bigint;
        VIEW_CHANNEL: bigint;
        SEND_MESSAGES: bigint;
        SEND_TTS_MESSAGES: bigint;
        MANAGE_MESSAGES: bigint;
        EMBED_LINKS: bigint;
        ATTACH_FILES: bigint;
        READ_MESSAGE_HISTORY: bigint;
        MENTION_EVERYONE: bigint;
        USE_EXTERNAL_EMOJIS: bigint;
        VIEW_GUILD_INSIGHTS: bigint;
        CONNECT: bigint;
        SPEAK: bigint;
        MUTE_MEMBERS: bigint;
        DEAFEN_MEMBERS: bigint;
        MOVE_MEMBERS: bigint;
        USE_VAD: bigint;
        CHANGE_NICKNAME: bigint;
        MANAGE_NICKNAMES: bigint;
        MANAGE_ROLES: bigint;
        MANAGE_WEBHOOKS: bigint;
        MANAGE_EMOJIS: bigint;
        USE_APPLICATION_COMMANDS: bigint;
        REQUEST_TO_SPEAK: bigint;
        MANAGE_THREADS: bigint;
        CREATE_PUBLIC_THREADS: bigint;
        CREATE_PRIVATE_THREADS: bigint;
        USE_EXTERNAL_STICKERS: bigint;
        SEND_MESSAGES_IN_THREADS: bigint;
        START_EMBEDDED_ACTIVITIES: bigint;
    };
    static ALL: bigint;
    static DEFAULT: bigint;
    static STAGE_MODERATOR: bigint;
    static defaultBit: bigint;
    constructor(bits?: import("../Types").PermissionResolvable);
    any(permission: import("../Types").PermissionResolvable, checkAdmin?: boolean): boolean;
    has(permission: import("../Types").PermissionResolvable, checkAdmin?: boolean): boolean;
}
export = Permissions;
