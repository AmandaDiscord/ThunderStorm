import Constants from "../Constants";
import BitField from "./BitField";
interface PermissionsConstructor {
    new (bits: import("../Types").PermissionResolvable): Permissions;
    readonly prototype: Permissions;
    readonly [Symbol.species]: PermissionsConstructor;
}
declare class Permissions extends BitField<typeof Constants.PERMISSION_FLAGS> {
    ["constructor"]: typeof Permissions;
    static readonly default: typeof Permissions;
    readonly [Symbol.species]: PermissionsConstructor;
    static ALL: bigint;
    static DEFAULT: bigint;
    constructor(bits: import("../Types").PermissionResolvable);
    static get FLAGS(): {
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
    };
    any(permission: import("../Types").PermissionResolvable, checkAdmin?: boolean): boolean;
    has(permission: import("../Types").PermissionResolvable, checkAdmin?: boolean): boolean;
}
export = Permissions;
