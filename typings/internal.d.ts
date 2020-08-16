import Discord = require("@amanda/discordtypings");

export type CloudStormEventDataTable = {
	CHANNEL_CREATE: Discord.DMChannelData | Discord.TextChannelData | Discord.CategoryChannelData | Discord.NewsChannelData | Discord.VoiceChannelData;
	CHANNEL_PINS_UPDATE: Discord.ChannelPinData;
	GUILD_CREATE: Discord.GuildData;
	GUILD_EMOJIS_UPDATE: Discord.GuildEmojisUpdateData;
	MESSAGE_CREATE: Discord.MessageData;
	MESSAGE_DELETE: Discord.MessageDeleteData;
	MESSAGE_UPDATE: Discord.MessageData;
	MESSAGE_REACTION_ADD: Discord.MessageReactionAddData;
	MESSAGE_REACTION_REMOVE: Discord.MessageReactionRemoveData;
	MESSAGE_REACTION_REMOVE_ALL: Discord.MessageReactionRemoveAllData;
	READY: Discord.ReadyData;
	RESUMED: Discord.ResumeData;
	VOICE_STATE_UPDATE: Discord.VoiceStateData;
}

export type InboundDataType<E extends keyof CloudStormEventDataTable> = {
	d: CloudStormEventDataTable[E];
	op: number;
	s: number;
	t: E;
	shard_id: number;
}

export interface PartialData {
	id: Snowflake;
	guild_id?: Snowflake;
	number?: number;
}
