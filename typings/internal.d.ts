import Constants = require("../constants.js");

type EVENTS = typeof Constants.EVENTS;

export type CloudStormEventDataTable = {
	CHANNEL_CREATE: DMChannelData | TextChannelData | CategoryChannelData | AnnouncementsChannelData | VoiceChannelData;
	CHANNEL_PINS_UPDATE: ChannelPinData;
	GUILD_CREATE: GuildData;
	GUILD_EMOJIS_UPDATE: GuildEmojisUpdateData;
	MESSAGE_CREATE: MessageData;
	MESSAGE_DELETE: MessageDeleteData;
	MESSAGE_UPDATE: MessageData;
	MESSAGE_REACTION_ADD: MessageReactionAddData;
	MESSAGE_REACTION_REMOVE: MessageReactionRemoveData;
	MESSAGE_REACTION_REMOVE_ALL: MessageReactionRemoveAllData;
	READY: ReadyData;
	RESUMED: ResumeData;
	VOICE_STATE_UPDATE: VoiceStateData;
}

export type InboundDataType<E extends keyof CloudStormEventDataTable> = {
	d: CloudStormEventDataTable[E];
	op: number;
	s: number;
	t: E;
	shard_id: number;
}

export type MessageDeleteData = {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	id: Snowflake;
}

export type MessageReactionAddData = {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	emoji: {
		id?: Snowflake;
		name: string;
	};
	member: MemberData & { user: UserData };
	message_id: Snowflake;
	user_id: Snowflake;
}

export type MessageReactionRemoveData = {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	emoji: {
		id?: Snowflake;
		name: string;
	};
	message_id: Snowflake;
	user_id: Snowflake;
}

export type MessageReactionRemoveAllData = {
	guild_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
}

export type GuildEmojisUpdateData = {
	emojis: GuildData["emojis"];
	guild_hashes: GuildData["guild_hashes"];
	guild_id: Snowflake;
}

export type VoiceStateData = {
	channel_id?: Snowflake;
	deaf: boolean;
	guild_id?: Snowflake;
	mute: boolean;
	self_deaf: boolean;
	self_mute: true;
	self_video: true;
	self_stream?: boolean;
	session_id: string;
	suppress: boolean;
	user_id: Snowflake;
	member?: MemberData & { user: UserData };
}

export type ChannelPinData = {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	last_pin_timestamp: string;
}

export type ReadyData = {
	_trace: Array<string>;
	application: { flags: number, id: string };
	guilds: Array<{ id: string, unavailable: boolean }>;
	presences: Array<PresenceData>;
	private_channels: Array<any>;
	relationships: Array<any>;
	session_id: string;
	shard: Array<number>;
	user: UserData;
}

export type ResumeData = {
	_trace: Array<string>;
}


// ===================================================================================== //


export type MessageData = {
	guild_id?: Snowflake;
	attachments: Array<AttachmentData>;
	author: UserData;
	channel_id: Snowflake;
	content?: string;
	edited_timestamp?: string;
	embeds: Array<EmbedData>;
	flags: number;
	id: Snowflake;
	member?: MemberData;
	mention_everyone: boolean;
	mention_roles: Array<Snowflake>;
	mentions: Array<UserData & { member: MemberData }>;
	nonce: Snowflake;
	pinned: boolean;
	timestamp: string;
	tts: boolean;
	type: number;
}

export type MemberData = {
	deaf: boolean;
	hoisted_role: Snowflake;
	joined_at: string;
	mute: boolean;
	nick: string;
	premium_since?: string;
	roles: Array<Snowflake>;
}

export type UserData = {
	avatar: string;
	discriminator: string;
	id: Snowflake;
	public_flags: number;
	username: string;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
	verified?: boolean;
}

export type EmbedData = {
	author?: {
		icon_url?: string;
		name?: string;
		proxy_icon_url?: string;
	};
	color?: number;
	description?: string;
	timestamp?: string;
	title?: string;
	type: "rich";
	url?: string;
	icon_url?: string;
	name?: string;
	fields?: Array<any>;
	footer?: {
		text?: string;
	}
}

export type AttachmentData = {
	filename: string;
	height: number;
	id: Snowflake;
	proxy_url?: string;
	size: number;
	url: string;
	width: number;
}

export type GuildData = {
	roles: Array<RoleData>;
	default_message_notifications: number;
	rules_channel_id?: Snowflake;
	max_video_channel_users: number;
	emojis: Array<EmojiData>;
	lazy: boolean;
	owner_id: Snowflake;
	discovery_splash?: string;
	preferred_locale: string;
	members: Array<MemberData & { user: UserData }>;
	icon?: string;
	banner?: string;
	premium_tier: number;
	features: Array<string>;
	presences: Array<PresenceData>;
	verification_level: number;
	voice_states: Array<VoiceStateData>;
	application_id?: Snowflake;
	vanity_url_code?: string;
	premium_subscription_count: number;
	name: string;
	channels: Array<TextChannelData | VoiceChannelData | CategoryChannelData | AnnouncementsChannelData>;
	joined_at: string;
	unavailable: boolean;
	guild_hashes: GuildHashData;
	public_updates_channel_id?: Snowflake;
	mfa_level: number;
	explicit_content_filter: number;
	system_channel_id?: Snowflake;
	afk_timeout: number;
	member_count: number;
	splash?: string;
	system_channel_flags: number;
	region?: string;
	description?: string;
	large: boolean;
	afk_channel_id?: Snowflake;
	id: Snowflake;
	embed_enabled?: boolean;
	embed_channel_id?: Snowflake;
}

export type GuildHashData = {
	channels: { hash: string, omitted?: boolean };
	metadata?: { hash: string, omitted?: boolean };
	roles?: { hash: string, omitted?: boolean };
	version: number;
}

export type RoleData = {
	color: number;
	hoist: boolean;
	id: Snowflake;
	managed: boolean;
	mentionable: boolean;
	name: string;
	permissions: number;
	permissions_new: string;
	position: number;
}

export type EmojiData = {
	animated: boolean;
	available: boolean;
	id: Snowflake;
	managed: boolean;
	name: string;
	require_colors: true;
	roles: Array<Snowflake>;
}

export type PresenceData = {
	user: UserData;
	roles: Array<Snowflake>;
	game: ActivityData;
	guild_id: Snowflake;
	activities: Array<ActivityData>;
	client_status: {
		desktop?: string;
		mobile?: string;
		web?: string;
	};
	premium_since?: string;
	nick?: string;
}

export type ActivityData = {
	name: string;
	type: number;
	url?: string;
	created_at: number;
	timestamps?: {
		start?: number;
		end?: number;
	};
	emoji?: {
		name: string;
		id?: Snowflake;
		animated?: boolean;
	};
	party?: {
		id?: string;
		size?: [number, number];
	};
	assets?: {
		large_image?: string;
		large_text?: string;
		small_image?: string;
		small_text?: string;
	};
	secrets?: {
		join?: string;
		spectate?: string;
		match?: string;
	};
	instance?: boolean;
	flags?: number;
}

export interface ChannelData {
	id: Snowflake;
	name: string;
	type: number;
}

export interface TextableChannelData extends ChannelData {
	last_message_id?: Snowflake;
	last_pin_timestamp?: string;
}

export interface DMChannelData extends TextableChannelData {
	recipients: Array<UserData>;
	type: 1;
}

export interface GuildChannelData extends ChannelData {
	permission_overwrites: Array<any>;
	position: number;
	parent_id?: Snowflake;
}

export interface CategoryChannelData extends GuildChannelData {
	nsfw: boolean;
	type: 4;
}

export interface TextChannelData extends GuildChannelData, TextableChannelData {
	rate_limit_per_user: number;
	topic?: string;
	nsfw: boolean;
	type: 0;
}

export interface AnnouncementsChannelData extends TextChannelData {
	type: 5;
}

export interface VoiceChannelData extends GuildChannelData {
	bitrate: number;
	user_limit: number;
	type: 2;
}

export interface Snowflake extends String {}
