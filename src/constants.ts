const EVENTS = {
	CHANNEL_CREATE: "channelCreate",
	CHANNEL_PINS_UPDATE: "channelPinsUpdate",
	GUILD_CREATE: "guildCreate",
	GUILD_DELETE: "guildDelete",
	GUILD_EMOJIS_UPDATE: "guildEmojisUpdate",
	GUILD_MEMBER_UPDATE: "guildMemberUpdate",
	GUILD_ROLE_CREATE: "guildRoleCreate",
	GUILD_ROLE_DELETE: "guildRoleDelete",
	GUILD_ROLE_UPDATE: "guildRoleUpdate",
	MESSAGE_CREATE: "message",
	MESSAGE_DELETE: "messageDelete",
	MESSAGE_UPDATE: "messageUpdate",
	MESSAGE_REACTION_ADD: "messageReactionAdd",
	MESSAGE_REACTION_REMOVE: "messageReactionRemove",
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll",
	READY: "ready",
	RESUMED: "ready",
	VOICE_STATE_UPDATE: "voiceStateUpdate"
};

const CLIENT_ONLY_EVENTS = {
	EVENT: "raw",
	READY: "ready",
	SHARD_DISCONNECT: "shardDisconnect",
	SHARD_READY: "shardReady",
	SHARD_RESUMED: "shardResume"
};

const CLOUD_ONLY_EVENTS = {
	DISCONNECTED: "disconnected",
	EVENT: "event",
	READY: "ready",
	SHARD_READY: "shardReady"
};

const API_VERSION = 8;

const Constants = {
	API_VERSION,
	BASE_API_ENDPOINT: `/api/v${API_VERSION}`,
	BASE_CDN_URL: "https://cdn.discordapp.com",
	BASE_HOST: "https://discord.com",
	SYSTEM_USER_ID: "643945264868098049",
	CLIENT_ONLY_EVENTS,
	CLOUD_ONLY_EVENTS,
	EVENTS
};

export = Constants;
