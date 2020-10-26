declare const Constants: {
    API_VERSION: number;
    BASE_API_ENDPOINT: string;
    BASE_CDN_URL: string;
    BASE_HOST: string;
    SYSTEM_USER_ID: string;
    CLIENT_ONLY_EVENTS: {
        EVENT: string;
        READY: string;
        SHARD_DISCONNECT: string;
        SHARD_READY: string;
        SHARD_RESUMED: string;
    };
    CLOUD_ONLY_EVENTS: {
        DISCONNECTED: string;
        EVENT: string;
        READY: string;
        SHARD_READY: string;
    };
    EVENTS: {
        CHANNEL_CREATE: string;
        CHANNEL_PINS_UPDATE: string;
        GUILD_CREATE: string;
        GUILD_DELETE: string;
        GUILD_EMOJIS_UPDATE: string;
        GUILD_MEMBER_UPDATE: string;
        GUILD_ROLE_CREATE: string;
        GUILD_ROLE_DELETE: string;
        GUILD_ROLE_UPDATE: string;
        MESSAGE_CREATE: string;
        MESSAGE_DELETE: string;
        MESSAGE_UPDATE: string;
        MESSAGE_REACTION_ADD: string;
        MESSAGE_REACTION_REMOVE: string;
        MESSAGE_REACTION_REMOVE_ALL: string;
        READY: string;
        RESUMED: string;
        VOICE_STATE_UPDATE: string;
    };
};
export = Constants;
