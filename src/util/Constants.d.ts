export declare const Endpoints: {
    CDN(root: string): {
        Emoji: (emojiID: string, format?: import("../Types").AllowedImageFormat) => string;
        Asset: (name: string) => string;
        DefaultAvatar: (discriminator: number) => string;
        Avatar: (userID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined, dynamic?: boolean) => string;
        Banner: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
        Icon: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined, dynamic?: boolean) => string;
        AppIcon: (clientID: string, hash: string, options?: {
            format?: import("../Types").AllowedImageFormat;
            size?: import("../Types").ImageSize;
        }) => string;
        AppAsset: (clientID: string, hash: string, options?: {
            format?: import("../Types").AllowedImageFormat;
            size?: import("../Types").ImageSize;
        }) => string;
        GDMIcon: (channelID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
        Splash: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
        DiscoverySplash: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
        TeamIcon: (teamID: string, hash: string, options?: {
            format?: import("../Types").AllowedImageFormat;
            size?: import("../Types").ImageSize;
        }) => string;
    };
    invite: (root: string, code: string) => string;
    botGateway: string;
};
export declare const Events: {
    CHANNEL_CREATE: "channelCreate";
    CHANNEL_DELETE: "channelDelete";
    CHANNEL_PINS_UPDATE: "channelPinsUpdate";
    CHANNEL_UPDATE: "channelUpdate";
    GUILD_BAN_ADD: "guildBanAdd";
    GUILD_BAN_REMOVE: "guildBanRemove";
    GUILD_CREATE: "guildCreate";
    GUILD_DELETE: "guildDelete";
    GUILD_EMOJI_CREATE: "emojiCreate";
    GUILD_EMOJIS_UPDATE: "emojisUpdate";
    GUILD_INTEGRATIONS_UPDATE: "guildIntegrationsUpdate";
    GUILD_MEMBERS_CHUNK: "guildMembersChunk";
    GUILD_MEMBER_ADD: "guildMemberAdd";
    GUILD_MEMBER_REMOVE: "guildMemberRemove";
    GUILD_MEMBER_UPDATE: "guildMemberUpdate";
    GUILD_ROLE_CREATE: "roleCreate";
    GUILD_ROLE_DELETE: "roleDelete";
    GUILD_ROLE_UPDATE: "roleUpdate";
    GUILD_UNAVAILABLE: "guildUnavailable";
    GUILD_UPDATE: "guildUpdate";
    INTERACTION_CREATE: "interaction";
    INVALID_SESSION: "invalidated";
    INVITE_CREATE: "inviteCreate";
    INVITE_DELETE: "inviteDelete";
    MESSAGE_BULK_DELETE: "messageDeleteBulk";
    MESSAGE_CREATE: "message";
    MESSAGE_DELETE: "messageDelete";
    MESSAGE_UPDATE: "messageUpdate";
    MESSAGE_REACTION_ADD: "messageReactionAdd";
    MESSAGE_REACTION_REMOVE: "messageReactionRemove";
    MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll";
    MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji";
    PRESENCE_UPDATE: "presenceUpdate";
    RATE_LIMIT: "rateLimit";
    RAW: "raw";
    READY: "ready";
    RESUMED: "shardResume";
    SHARD_DISCONNECT: "shardDisconnect";
    SHARD_READY: "shardReady";
    THREAD_CREATE: "threadCreate";
    THREAD_DELETE: "threadDelete";
    THREAD_LIST_SYNC: "threadListSync";
    THREAD_MEMBER_UPDATE: "threadMemberUpdate";
    THREAD_MEMBERS_UPDATE: "threadMembersUpdate";
    THREAD_UPDATE: "threadUpdate";
    TYPING_START: "typingStart";
    USER_UPDATE: "userUpdate";
    VOICE_STATE_UPDATE: "voiceStateUpdate";
    WEBHOOKS_UPDATE: "webhookUpdate";
};
export declare const PartialTypes: {
    USER: "USER";
    CHANNEL: "CHANNEL";
    GUILD_MEMBER: "GUILD_MEMBER";
    MESSAGE: "MESSAGE";
    REACTION: "REACTION";
};
export declare const InviteScopes: [
    "applications.builds.read",
    "applications.commands",
    "applications.entitlements",
    "applications.store.update",
    "connections",
    "email",
    "identity",
    "guilds",
    "guilds.join",
    "gdm.join",
    "webhook.incoming"
];
export declare const MessageTypes: [
    "DEFAULT",
    "RECIPIENT_ADD",
    "RECIPIENT_REMOVE",
    "CALL",
    "CHANNEL_NAME_CHANGE",
    "CHANNEL_ICON_CHANGE",
    "PINS_ADD",
    "GUILD_MEMBER_JOIN",
    "USER_PREMIUM_GUILD_SUBSCRIPTION",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    "CHANNEL_FOLLOW_ADD",
    null,
    "GUILD_DISCOVERY_DISQUALIFIED",
    "GUILD_DISCOVERY_REQUALIFIED",
    "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
    "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
    null,
    "REPLY",
    "APPLICATION_COMMAND",
    "THREAD_STARTER_MESSAGE",
    "GUILD_INVITE_REMINDER"
];
export declare const SystemMessageTypes: Exclude<typeof MessageTypes, null | "DEFAULT" | "REPLY" | "APPLICATION_COMMAND">;
export declare const ActivityTypes: ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"];
export declare const ClientApplicationAssetTypes: {
    SMALL: 1;
    BIG: 2;
};
export declare const ChannelTypes: {
    0: "text";
    text: 0;
    1: "dm";
    dm: 1;
    2: "voice";
    voice: 2;
    4: "category";
    category: 4;
    5: "news";
    news: 5;
    6: "store";
    store: 6;
    10: "news-thread";
    "news-thread": 10;
    11: "public-thread";
    "public-thread": 11;
    12: "private-thread";
    "private-thread": 12;
    13: "stage";
    stage: 13;
};
export declare const Colors: {
    DEFAULT: number;
    WHITE: number;
    AQUA: number;
    GREEN: number;
    BLUE: number;
    YELLOW: number;
    PURPLE: number;
    LUMINOUS_VIVID_PINK: number;
    GOLD: number;
    ORANGE: number;
    RED: number;
    GREY: number;
    NAVY: number;
    DARK_AQUA: number;
    DARK_GREEN: number;
    DARK_BLUE: number;
    DARK_PURPLE: number;
    DARK_VIVID_PINK: number;
    DARK_GOLD: number;
    DARK_ORANGE: number;
    DARK_RED: number;
    DARK_GREY: number;
    DARKER_GREY: number;
    LIGHT_GREY: number;
    DARK_NAVY: number;
    BLURPLE: number;
    GREYPLE: number;
    DARK_BUT_NOT_BLACK: number;
    NOT_QUITE_BLACK: number;
    RANDOM: number;
};
export declare const ExplicitContentFilterLevels: ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"];
export declare const VerificationLevels: ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];
export declare const APIErrors: {
    UNKNOWN_ACCOUNT: 10001;
    UNKNOWN_APPLICATION: 10002;
    UNKNOWN_CHANNEL: 10003;
    UNKNOWN_GUILD: 10004;
    UNKNOWN_INTEGRATION: 10005;
    UNKNOWN_INVITE: 10006;
    UNKNOWN_MEMBER: 10007;
    UNKNOWN_MESSAGE: 10008;
    UNKNOWN_OVERWRITE: 10009;
    UNKNOWN_PROVIDER: 10010;
    UNKNOWN_ROLE: 10011;
    UNKNOWN_TOKEN: 10012;
    UNKNOWN_USER: 10013;
    UNKNOWN_EMOJI: 10014;
    UNKNOWN_WEBHOOK: 10015;
    UNKNOWN_BAN: 10026;
    UNKNOWN_GUILD_TEMPLATE: 10057;
    BOT_PROHIBITED_ENDPOINT: 20001;
    BOT_ONLY_ENDPOINT: 20002;
    ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED: 20022;
    CHANNEL_HIT_WRITE_RATELIMIT: 20028;
    MAXIMUM_GUILDS: 30001;
    MAXIMUM_FRIENDS: 30002;
    MAXIMUM_PINS: 30003;
    MAXIMUM_ROLES: 30005;
    MAXIMUM_WEBHOOKS: 30007;
    MAXIMUM_REACTIONS: 30010;
    MAXIMUM_CHANNELS: 30013;
    MAXIMUM_ATTACHMENTS: 30015;
    MAXIMUM_INVITES: 30016;
    GUILD_ALREADY_HAS_TEMPLATE: 30031;
    UNAUTHORIZED: 40001;
    ACCOUNT_VERIFICATION_REQUIRED: 40002;
    REQUEST_ENTITY_TOO_LARGE: 40005;
    FEATURE_TEMPORARILY_DISABLED: 40006;
    USER_BANNED: 40007;
    ALREADY_CROSSPOSTED: 40033;
    MISSING_ACCESS: 50001;
    INVALID_ACCOUNT_TYPE: 50002;
    CANNOT_EXECUTE_ON_DM: 50003;
    EMBED_DISABLED: 50004;
    CANNOT_EDIT_MESSAGE_BY_OTHER: 50005;
    CANNOT_SEND_EMPTY_MESSAGE: 50006;
    CANNOT_MESSAGE_USER: 50007;
    CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008;
    CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009;
    OAUTH2_APPLICATION_BOT_ABSENT: 50010;
    MAXIMUM_OAUTH2_APPLICATIONS: 50011;
    INVALID_OAUTH_STATE: 50012;
    MISSING_PERMISSIONS: 50013;
    INVALID_AUTHENTICATION_TOKEN: 50014;
    NOTE_TOO_LONG: 50015;
    INVALID_BULK_DELETE_QUANTITY: 50016;
    CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019;
    INVALID_OR_TAKEN_INVITE_CODE: 50020;
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021;
    CANNOT_EXECUTE_ON_CHANNEL_TYPE: 50024;
    INVALID_OAUTH_TOKEN: 50025;
    INVALID_RECIPIENTS: 50033;
    BULK_DELETE_MESSAGE_TOO_OLD: 50034;
    INVALID_FORM_BODY: 50035;
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036;
    INVALID_API_VERSION: 50041;
    CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: 50074;
    INVALID_STICKER_SENT: 50081;
    REACTION_BLOCKED: 90001;
    RESOURCE_OVERLOADED: 130000;
};
export declare const DefaultMessageNotifications: ["ALL", "MENTIONS"];
export declare const MembershipStates: [null, "INVITED", "ACCEPTED"];
export declare const WebhookTypes: [null, "Incoming", "Channel Follower", "Application"];
export declare const StickerFormatTypes: {
    1: "PNG";
    PNG: 1;
    2: "APNG";
    APNG: 2;
    3: "LOTTIE";
    LOTTIE: 3;
};
export declare const OverwriteTypes: {
    0: "role";
    role: 0;
    1: "member";
    member: 1;
};
export declare const ApplicationCommandOptionTypes: {
    1: "SUB_COMMAND";
    SUB_COMMAND: 1;
    2: "SUB_COMMAND_GROUP";
    SUB_COMMAND_GROUP: 2;
    3: "STRING";
    STRING: 3;
    4: "INTEGER";
    INTEGER: 4;
    5: "BOOLEAN";
    BOOLEAN: 5;
    6: "USER";
    USER: 6;
    7: "CHANNEL";
    CHANNEL: 7;
    8: "ROLE";
    ROLE: 8;
    9: "MENTIONABLE";
    MENTIONABLE: 9;
};
export declare const ApplicationCommandPermissionTypes: {
    1: "ROLE";
    ROLE: 1;
    2: "USER";
    USER: 2;
};
export declare const InteractionTypes: {
    1: "PING";
    PING: 1;
    2: "APPLICATION_COMMAND";
    APPLICATION_COMMAND: 2;
    3: "MESSAGE_COMPONENT";
    MESSAGE_COMPONENT: 3;
};
export declare const InteractionResponseTypes: {
    1: "PONG";
    PONG: 1;
    4: "CHANNEL_MESSAGE_WITH_SOURCE";
    CHANNEL_MESSAGE_WITH_SOURCE: 4;
    5: "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5;
    6: "DEFERRED_MESSAGE_UPDATE";
    DEFERRED_MESSAGE_UPDATE: 6;
    7: "UPDATE_MESSAGE";
    UPDATE_MESSAGE: 7;
};
export declare const MessageComponentTypes: {
    1: "ACTION_ROW";
    ACTION_ROW: 1;
    2: "BUTTON";
    BUTTON: 2;
};
export declare const MessageButtonStyles: {
    1: "PRIMARY";
    PRIMARY: 1;
    2: "SECONDARY";
    SECONDARY: 2;
    3: "SUCCESS";
    SUCCESS: 3;
    4: "DANGER";
    DANGER: 4;
    5: "LINK";
    LINK: 5;
};
export declare const NSFWLevels: {
    0: "DEFAULT";
    DEFAULT: 0;
    1: "EXPLICIT";
    EXPLICIT: 1;
    2: "SAFE";
    SAFE: 2;
    3: "AGE_RESTRICTED";
    AGE_RESTRICTED: 3;
};
export declare const SYSTEM_USER_ID = "643945264868098049";
declare const Constants: {
    SYSTEM_USER_ID: string;
    Endpoints: {
        CDN(root: string): {
            Emoji: (emojiID: string, format?: import("../Types").AllowedImageFormat) => string;
            Asset: (name: string) => string;
            DefaultAvatar: (discriminator: number) => string;
            Avatar: (userID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined, dynamic?: boolean) => string;
            Banner: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
            Icon: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined, dynamic?: boolean) => string;
            AppIcon: (clientID: string, hash: string, options?: {
                format?: import("../Types").AllowedImageFormat;
                size?: import("../Types").ImageSize;
            }) => string;
            AppAsset: (clientID: string, hash: string, options?: {
                format?: import("../Types").AllowedImageFormat;
                size?: import("../Types").ImageSize;
            }) => string;
            GDMIcon: (channelID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
            Splash: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
            DiscoverySplash: (guildID: string, hash: string, format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize | undefined) => string;
            TeamIcon: (teamID: string, hash: string, options?: {
                format?: import("../Types").AllowedImageFormat;
                size?: import("../Types").ImageSize;
            }) => string;
        };
        invite: (root: string, code: string) => string;
        botGateway: string;
    };
    Events: {
        CHANNEL_CREATE: "channelCreate";
        CHANNEL_DELETE: "channelDelete";
        CHANNEL_PINS_UPDATE: "channelPinsUpdate";
        CHANNEL_UPDATE: "channelUpdate";
        GUILD_BAN_ADD: "guildBanAdd";
        GUILD_BAN_REMOVE: "guildBanRemove";
        GUILD_CREATE: "guildCreate";
        GUILD_DELETE: "guildDelete";
        GUILD_EMOJI_CREATE: "emojiCreate";
        GUILD_EMOJIS_UPDATE: "emojisUpdate";
        GUILD_INTEGRATIONS_UPDATE: "guildIntegrationsUpdate";
        GUILD_MEMBERS_CHUNK: "guildMembersChunk";
        GUILD_MEMBER_ADD: "guildMemberAdd";
        GUILD_MEMBER_REMOVE: "guildMemberRemove";
        GUILD_MEMBER_UPDATE: "guildMemberUpdate";
        GUILD_ROLE_CREATE: "roleCreate";
        GUILD_ROLE_DELETE: "roleDelete";
        GUILD_ROLE_UPDATE: "roleUpdate";
        GUILD_UNAVAILABLE: "guildUnavailable";
        GUILD_UPDATE: "guildUpdate";
        INTERACTION_CREATE: "interaction";
        INVALID_SESSION: "invalidated";
        INVITE_CREATE: "inviteCreate";
        INVITE_DELETE: "inviteDelete";
        MESSAGE_BULK_DELETE: "messageDeleteBulk";
        MESSAGE_CREATE: "message";
        MESSAGE_DELETE: "messageDelete";
        MESSAGE_UPDATE: "messageUpdate";
        MESSAGE_REACTION_ADD: "messageReactionAdd";
        MESSAGE_REACTION_REMOVE: "messageReactionRemove";
        MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll";
        MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji";
        PRESENCE_UPDATE: "presenceUpdate";
        RATE_LIMIT: "rateLimit";
        RAW: "raw";
        READY: "ready";
        RESUMED: "shardResume";
        SHARD_DISCONNECT: "shardDisconnect";
        SHARD_READY: "shardReady";
        THREAD_CREATE: "threadCreate";
        THREAD_DELETE: "threadDelete";
        THREAD_LIST_SYNC: "threadListSync";
        THREAD_MEMBER_UPDATE: "threadMemberUpdate";
        THREAD_MEMBERS_UPDATE: "threadMembersUpdate";
        THREAD_UPDATE: "threadUpdate";
        TYPING_START: "typingStart";
        USER_UPDATE: "userUpdate";
        VOICE_STATE_UPDATE: "voiceStateUpdate";
        WEBHOOKS_UPDATE: "webhookUpdate";
    };
    PartialTypes: {
        USER: "USER";
        CHANNEL: "CHANNEL";
        GUILD_MEMBER: "GUILD_MEMBER";
        MESSAGE: "MESSAGE";
        REACTION: "REACTION";
    };
    InviteScopes: ["applications.builds.read", "applications.commands", "applications.entitlements", "applications.store.update", "connections", "email", "identity", "guilds", "guilds.join", "gdm.join", "webhook.incoming"];
    MessageTypes: ["DEFAULT", "RECIPIENT_ADD", "RECIPIENT_REMOVE", "CALL", "CHANNEL_NAME_CHANGE", "CHANNEL_ICON_CHANGE", "PINS_ADD", "GUILD_MEMBER_JOIN", "USER_PREMIUM_GUILD_SUBSCRIPTION", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3", "CHANNEL_FOLLOW_ADD", null, "GUILD_DISCOVERY_DISQUALIFIED", "GUILD_DISCOVERY_REQUALIFIED", "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING", "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING", null, "REPLY", "APPLICATION_COMMAND", "THREAD_STARTER_MESSAGE", "GUILD_INVITE_REMINDER"];
    SystemMessageTypes: ["DEFAULT", "RECIPIENT_ADD", "RECIPIENT_REMOVE", "CALL", "CHANNEL_NAME_CHANGE", "CHANNEL_ICON_CHANGE", "PINS_ADD", "GUILD_MEMBER_JOIN", "USER_PREMIUM_GUILD_SUBSCRIPTION", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3", "CHANNEL_FOLLOW_ADD", null, "GUILD_DISCOVERY_DISQUALIFIED", "GUILD_DISCOVERY_REQUALIFIED", "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING", "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING", null, "REPLY", "APPLICATION_COMMAND", "THREAD_STARTER_MESSAGE", "GUILD_INVITE_REMINDER"];
    ActivityTypes: ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"];
    ClientApplicationAssetTypes: {
        SMALL: 1;
        BIG: 2;
    };
    ChannelTypes: {
        0: "text";
        text: 0;
        1: "dm";
        dm: 1;
        2: "voice";
        voice: 2;
        4: "category";
        category: 4;
        5: "news";
        news: 5;
        6: "store";
        store: 6;
        10: "news-thread";
        "news-thread": 10;
        11: "public-thread";
        "public-thread": 11;
        12: "private-thread";
        "private-thread": 12;
        13: "stage";
        stage: 13;
    };
    Colors: {
        DEFAULT: number;
        WHITE: number;
        AQUA: number;
        GREEN: number;
        BLUE: number;
        YELLOW: number;
        PURPLE: number;
        LUMINOUS_VIVID_PINK: number;
        GOLD: number;
        ORANGE: number;
        RED: number;
        GREY: number;
        NAVY: number;
        DARK_AQUA: number;
        DARK_GREEN: number;
        DARK_BLUE: number;
        DARK_PURPLE: number;
        DARK_VIVID_PINK: number;
        DARK_GOLD: number;
        DARK_ORANGE: number;
        DARK_RED: number;
        DARK_GREY: number;
        DARKER_GREY: number;
        LIGHT_GREY: number;
        DARK_NAVY: number;
        BLURPLE: number;
        GREYPLE: number;
        DARK_BUT_NOT_BLACK: number;
        NOT_QUITE_BLACK: number;
        RANDOM: number;
    };
    ExplicitContentFilterLevels: ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"];
    VerificationLevels: ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];
    APIErrors: {
        UNKNOWN_ACCOUNT: 10001;
        UNKNOWN_APPLICATION: 10002;
        UNKNOWN_CHANNEL: 10003;
        UNKNOWN_GUILD: 10004;
        UNKNOWN_INTEGRATION: 10005;
        UNKNOWN_INVITE: 10006;
        UNKNOWN_MEMBER: 10007;
        UNKNOWN_MESSAGE: 10008;
        UNKNOWN_OVERWRITE: 10009;
        UNKNOWN_PROVIDER: 10010;
        UNKNOWN_ROLE: 10011;
        UNKNOWN_TOKEN: 10012;
        UNKNOWN_USER: 10013;
        UNKNOWN_EMOJI: 10014;
        UNKNOWN_WEBHOOK: 10015;
        UNKNOWN_BAN: 10026;
        UNKNOWN_GUILD_TEMPLATE: 10057;
        BOT_PROHIBITED_ENDPOINT: 20001;
        BOT_ONLY_ENDPOINT: 20002;
        ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED: 20022;
        CHANNEL_HIT_WRITE_RATELIMIT: 20028;
        MAXIMUM_GUILDS: 30001;
        MAXIMUM_FRIENDS: 30002;
        MAXIMUM_PINS: 30003;
        MAXIMUM_ROLES: 30005;
        MAXIMUM_WEBHOOKS: 30007;
        MAXIMUM_REACTIONS: 30010;
        MAXIMUM_CHANNELS: 30013;
        MAXIMUM_ATTACHMENTS: 30015;
        MAXIMUM_INVITES: 30016;
        GUILD_ALREADY_HAS_TEMPLATE: 30031;
        UNAUTHORIZED: 40001;
        ACCOUNT_VERIFICATION_REQUIRED: 40002;
        REQUEST_ENTITY_TOO_LARGE: 40005;
        FEATURE_TEMPORARILY_DISABLED: 40006;
        USER_BANNED: 40007;
        ALREADY_CROSSPOSTED: 40033;
        MISSING_ACCESS: 50001;
        INVALID_ACCOUNT_TYPE: 50002;
        CANNOT_EXECUTE_ON_DM: 50003;
        EMBED_DISABLED: 50004;
        CANNOT_EDIT_MESSAGE_BY_OTHER: 50005;
        CANNOT_SEND_EMPTY_MESSAGE: 50006;
        CANNOT_MESSAGE_USER: 50007;
        CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008;
        CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009;
        OAUTH2_APPLICATION_BOT_ABSENT: 50010;
        MAXIMUM_OAUTH2_APPLICATIONS: 50011;
        INVALID_OAUTH_STATE: 50012;
        MISSING_PERMISSIONS: 50013;
        INVALID_AUTHENTICATION_TOKEN: 50014;
        NOTE_TOO_LONG: 50015;
        INVALID_BULK_DELETE_QUANTITY: 50016;
        CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019;
        INVALID_OR_TAKEN_INVITE_CODE: 50020;
        CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021;
        CANNOT_EXECUTE_ON_CHANNEL_TYPE: 50024;
        INVALID_OAUTH_TOKEN: 50025;
        INVALID_RECIPIENTS: 50033;
        BULK_DELETE_MESSAGE_TOO_OLD: 50034;
        INVALID_FORM_BODY: 50035;
        INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036;
        INVALID_API_VERSION: 50041;
        CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: 50074;
        INVALID_STICKER_SENT: 50081;
        REACTION_BLOCKED: 90001;
        RESOURCE_OVERLOADED: 130000;
    };
    DefaultMessageNotifications: ["ALL", "MENTIONS"];
    MembershipStates: [null, "INVITED", "ACCEPTED"];
    WebhookTypes: [null, "Incoming", "Channel Follower", "Application"];
    StickerFormatTypes: {
        1: "PNG";
        PNG: 1;
        2: "APNG";
        APNG: 2;
        3: "LOTTIE";
        LOTTIE: 3;
    };
    OverwriteTypes: {
        0: "role";
        role: 0;
        1: "member";
        member: 1;
    };
    ApplicationCommandOptionTypes: {
        1: "SUB_COMMAND";
        SUB_COMMAND: 1;
        2: "SUB_COMMAND_GROUP";
        SUB_COMMAND_GROUP: 2;
        3: "STRING";
        STRING: 3;
        4: "INTEGER";
        INTEGER: 4;
        5: "BOOLEAN";
        BOOLEAN: 5;
        6: "USER";
        USER: 6;
        7: "CHANNEL";
        CHANNEL: 7;
        8: "ROLE";
        ROLE: 8;
        9: "MENTIONABLE";
        MENTIONABLE: 9;
    };
    ApplicationCommandPermissionTypes: {
        1: "ROLE";
        ROLE: 1;
        2: "USER";
        USER: 2;
    };
    InteractionTypes: {
        1: "PING";
        PING: 1;
        2: "APPLICATION_COMMAND";
        APPLICATION_COMMAND: 2;
        3: "MESSAGE_COMPONENT";
        MESSAGE_COMPONENT: 3;
    };
    InteractionResponseTypes: {
        1: "PONG";
        PONG: 1;
        4: "CHANNEL_MESSAGE_WITH_SOURCE";
        CHANNEL_MESSAGE_WITH_SOURCE: 4;
        5: "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
        DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5;
        6: "DEFERRED_MESSAGE_UPDATE";
        DEFERRED_MESSAGE_UPDATE: 6;
        7: "UPDATE_MESSAGE";
        UPDATE_MESSAGE: 7;
    };
    MessageComponentTypes: {
        1: "ACTION_ROW";
        ACTION_ROW: 1;
        2: "BUTTON";
        BUTTON: 2;
    };
    MessageButtonStyles: {
        1: "PRIMARY";
        PRIMARY: 1;
        2: "SECONDARY";
        SECONDARY: 2;
        3: "SUCCESS";
        SUCCESS: 3;
        4: "DANGER";
        DANGER: 4;
        5: "LINK";
        LINK: 5;
    };
    NSFWLevels: {
        0: "DEFAULT";
        DEFAULT: 0;
        1: "EXPLICIT";
        EXPLICIT: 1;
        2: "SAFE";
        SAFE: 2;
        3: "AGE_RESTRICTED";
        AGE_RESTRICTED: 3;
    };
};
export default Constants;
