import Discord = require("@amanda/discordtypings");

export type CloudStormEventDataTable = {
	CHANNEL_CREATE: Discord.DMChannelData | Discord.TextChannelData | Discord.CategoryChannelData | Discord.NewsChannelData | Discord.VoiceChannelData;
	CHANNEL_PINS_UPDATE: Discord.ChannelPinData;
	GUILD_CREATE: Discord.GuildData;
	GUILD_EMOJIS_UPDATE: Discord.GuildEmojisUpdateData;
	GUILD_MEMBER_UPDATE: Discord.MemberData;
	GUILD_ROLE_CREATE: { guild_id: string, role: Discord.RoleData };
	GUILD_ROLE_DELETE: { guild_id: string, role_id: string };
	GUILD_ROLE_UPDATE: { guild_id: string, role: Discord.RoleData };
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
	id: import("@amanda/discordtypings").Snowflake;
	guild_id?: import("@amanda/discordtypings").Snowflake;
	number?: number;
}
