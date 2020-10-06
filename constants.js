const EVENTS = {
	/** @type { "channelCreate"} */
	// @ts-ignore
	CHANNEL_CREATE: "channelCreate",
	/** @type { "channelPinsUpdate"} */
	// @ts-ignore
	CHANNEL_PINS_UPDATE: "channelPinsUpdate",
	/** @type {"guildCreate"} */
	// @ts-ignore
	GUILD_CREATE: "guildCreate",
	/** @type {"guildDelete"} */
	// @ts-ignore
	GUILD_DELETE: "guildDelete",
	/** @type {"guildEmojisUpdate"} */
	// @ts-ignore
	GUILD_EMOJIS_UPDATE: "guildEmojisUpdate",
	/** @type {"guildMemberUpdate"} */
	// @ts-ignore
	GUILD_MEMBER_UPDATE: "guildMemberUpdate",
	/** @type {"guildRoleCreate"} */
	// @ts-ignore
	GUILD_ROLE_CREATE: "guildRoleCreate",
	/** @type {"guildRoleDelete"} */
	// @ts-ignore
	GUILD_ROLE_DELETE: "guildRoleDelete",
	/** @type {"guildRoleUpdate"} */
	// @ts-ignore
	GUILD_ROLE_UPDATE: "guildRoleUpdate",
	/** @type {"message"} */
	// @ts-ignore
	MESSAGE_CREATE: "message",
	/** @type {"messageDelete"} */
	// @ts-ignore
	MESSAGE_DELETE: "messageDelete",
	/** @type {"messageUpdate"} */
	// @ts-ignore
	MESSAGE_UPDATE: "messageUpdate",
	/** @type {"messageReactionAdd"} */
	// @ts-ignore
	MESSAGE_REACTION_ADD: "messageReactionAdd",
	/** @type {"messageReactionRemove"} */
	// @ts-ignore
	MESSAGE_REACTION_REMOVE: "messageReactionRemove",
	/** @type {"messageReactionRemoveAll"} */
	// @ts-ignore
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll",
	/** @type {"ready"} */
	// @ts-ignore
	READY: "ready",
	/** @type {"ready"} */
	// @ts-ignore
	RESUMED: "ready",
	/** @type {"voiceStateUpdate"} */
	// @ts-ignore
	VOICE_STATE_UPDATE: "voiceStateUpdate"
}

const CLIENT_ONLY_EVENTS = {
	/** @type {"raw"} */
	// @ts-ignore
	EVENT: "raw",
	/** @type {"ready"} */
	// @ts-ignore
	READY: "ready",
	/** @type {"shardDisconnect"} */
	// @ts-ignore
	SHARD_DISCONNECT: "shardDisconnect",
	/** @type {"shardReady"} */
	// @ts-ignore
	SHARD_READY: "shardReady",
	/** @type {"shardResume"} */
	// @ts-ignore
	SHARD_RESUMED: "shardResume"
}

const CLOUD_ONLY_EVENTS = {
	/** @type {"disconnected"} */
	// @ts-ignore
	DISCONNECTED: "disconnected",
	/** @type {"event"} */
	// @ts-ignore
	EVENT: "event",
	/** @type {"ready"} */
	// @ts-ignore
	READY: "ready",
	/** @type {"shardReady"} */
	// @ts-ignore
	SHARD_READY: "shardReady"
}

const API_VERSION = 7;

const Constants = {
	API_VERSION,
	BASE_API_ENDPOINT: `/api/v${API_VERSION}`,
	BASE_CDN_URL: "https://cdn.discordapp.com",
	BASE_HOST: "https://discord.com",
	SYSTEM_USER_ID: "643945264868098049",
	CLIENT_ONLY_EVENTS,
	CLOUD_ONLY_EVENTS,
	EVENTS,
};

module.exports = Constants;
