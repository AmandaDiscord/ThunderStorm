import Integration from "./Integration";
import Webhook from "./Webhook";
import { Collection } from "@discordjs/collection";
declare class GuildAuditLogs {
    static Actions: {
        ALL: null;
        GUILD_UPDATE: 1;
        CHANNEL_CREATE: 10;
        CHANNEL_UPDATE: 11;
        CHANNEL_DELETE: 12;
        CHANNEL_OVERWRITE_CREATE: 13;
        CHANNEL_OVERWRITE_UPDATE: 14;
        CHANNEL_OVERWRITE_DELETE: 15;
        MEMBER_KICK: 20;
        MEMBER_PRUNE: 21;
        MEMBER_BAN_ADD: 22;
        MEMBER_BAN_REMOVE: 23;
        MEMBER_UPDATE: 24;
        MEMBER_ROLE_UPDATE: 25;
        MEMBER_MOVE: 26;
        MEMBER_DISCONNECT: 27;
        BOT_ADD: 28;
        ROLE_CREATE: 30;
        ROLE_UPDATE: 31;
        ROLE_DELETE: 32;
        INVITE_CREATE: 40;
        INVITE_UPDATE: 41;
        INVITE_DELETE: 42;
        WEBHOOK_CREATE: 50;
        WEBHOOK_UPDATE: 51;
        WEBHOOK_DELETE: 52;
        EMOJI_CREATE: 60;
        EMOJI_UPDATE: 61;
        EMOJI_DELETE: 62;
        MESSAGE_DELETE: 72;
        MESSAGE_BULK_DELETE: 73;
        MESSAGE_PIN: 74;
        MESSAGE_UNPIN: 75;
        INTEGRATION_CREATE: 80;
        INTEGRATION_UPDATE: 81;
        INTEGRATION_DELETE: 82;
        STAGE_INSTANCE_CREATE: 83;
        STAGE_INSTANCE_UPDATE: 84;
        STAGE_INSTANCE_DELETE: 85;
        STICKER_CREATE: 90;
        STICKER_UPDATE: 91;
        STICKER_DELETE: 92;
        GUILD_SCHEDULED_EVENT_CREATE: 100;
        GUILD_SCHEDULED_EVENT_UPDATE: 101;
        GUILD_SCHEDULED_EVENT_DELETE: 102;
        THREAD_CREATE: 110;
        THREAD_UPDATE: 111;
        THREAD_DELETE: 112;
    };
    static Targets: {
        ALL: "ALL";
        GUILD: "GUILD";
        CHANNEL: "CHANNEL";
        USER: "USER";
        ROLE: "ROLE";
        INVITE: "INVITE";
        WEBHOOK: "WEBHOOK";
        EMOJI: "EMOJI";
        MESSAGE: "MESSAGE";
        INTEGRATION: "INTEGRATION";
        UNKNOWN: "UNKNOWN";
    };
    static Entry: typeof GuildAuditLogsEntry;
    webhooks: Collection<string, Webhook>;
    integrations: Collection<string, Integration>;
    entries: Collection<string, GuildAuditLogsEntry>;
    static readonly default: typeof GuildAuditLogs;
    constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: import("discord-typings").AuditLogObject);
    static build(...args: ConstructorParameters<typeof GuildAuditLogs>): Promise<GuildAuditLogs>;
    static targetType(target: import("../Types").AuditLogAction): import("../Types").AuditLogTargetType;
    static actionType(action: import("../Types").AuditLogAction): import("../Types").AuditLogActionType;
    toJSON(): any;
}
declare class GuildAuditLogsEntry {
    targetType: import("../Types").AuditLogTargetType;
    actionType: import("../Types").AuditLogActionType;
    action: import("../Types").AuditLogAction;
    reason: string | null;
    executor: import("./Partial/PartialUser") | null;
    changes: Array<import("../Types").AuditLogChange>;
    id: string;
    extra: import("./Partial/PartialUser") | import("./Partial/PartialRole") | import("./Role") | {
        removed?: number;
        days?: number;
        channel?: import("./Partial/PartialChannel");
        count?: number;
        messageId?: string;
    } | null;
    target: import("../Types").AuditLogEntryTarget | null;
    constructor(logs: GuildAuditLogs, guild: import("./Guild") | import("./Partial/PartialGuild"), data: import("discord-typings").AuditLogEntry);
    get createdTimestamp(): number;
    get createdAt(): Date;
    toJSON(): any;
}
export = GuildAuditLogs;
