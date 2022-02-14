// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Constants from "./util/Constants";

import MessageAttachment from "./structures/MessageAttachment";
import MessageEmbed from "./structures/MessageEmbed";

export type FlattenIfArray<T> = T extends Array<infer R> ? R : T;
export type FlattenIfReadonlyArray<T> = T extends ReadonlyArray<infer R> ? R : T;

export interface ClientEvents {
	channelCreate: [import("./internal").AnyChannel];
	channelDelete: [import("./structures/Partial/PartialChannel")];
	channelPinsUpdate: [import("./structures/Partial/PartialChannel"), Date];
	channelUpdate: [import("./internal").AnyChannel];
	debug: [string];
	guildBanAdd: [import("./structures/GuildBan")];
	guildBanRemove: [import("./structures/GuildBan")];
	guildCreate: [import("./structures/Guild")];
	guildDelete: [import("./structures/Partial/PartialGuild")];
	emojiCreate: [import("./structures/Emoji")];
	emojisUpdate: [import("./structures/Partial/PartialGuild"), import("@discordjs/Collection").Collection<string, import("./structures/Emoji")>];
	guildIntegrationsUpdate: [import("./structures/Partial/PartialGuild")];
	guildMemberAdd: [import("./structures/GuildMember")];
	guildMemberRemove: [import("./structures/GuildMember")];
	guildMembersChunk: [import("@discordjs/Collection").Collection<string, import("./structures/GuildMember")>, import("./structures/Partial/PartialGuild"), { index: number, count: number, nonce: string | null }];
	guildMemberUpdate: [import("./structures/GuildMember")];
	guildUnavailable: [import("./structures/Partial/PartialGuild")];
	guildUpdate: [import("./structures/Guild")];
	interactionCreate: [import("./structures/Interaction")];
	invalidated: [];
	inviteCreate: [import("./structures/Invite")];
	inviteDelete: [import("./structures/Invite")];
	messageCreate: [import("./structures/Message")];
	messageDelete: [import("./structures/Partial/PartialMessage")];
	messageDeleteBulk: [import("@discordjs/Collection").Collection<string, import("./structures/Partial/PartialMessage")>];
	messageReactionAdd: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
	messageReactionRemove: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
	messageReactionRemoveAll: [import("./structures/Partial/PartialMessage")];
	messageReactionRemoveEmoji: [import("./structures/MessageReaction")];
	messageUpdate: [import("./structures/Message")];
	presenceUpdate: [import("./structures/Presence").Presence]
	rateLimit: [{ timeout: number; limit: number; method: string; path: string; route: string }];
	raw: [import("./internal").InboundDataType<keyof import("./internal").GatewayEventDataTable>];
	ready: [import("./structures/ClientUser")];
	roleCreate: [import("./structures/Role")];
	roleDelete: [import("./structures/Partial/PartialRole")];
	roleUpdate: [import("./structures/Role")];
	shardDisconnect: [{ code: number; reason: string; wasClean: boolean }, number];
	shardReady: [number, Set<string>];
	shardResume: [number];
	threadCreate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
	threadDelete: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
	threadListSync: [import("@discordjs/Collection").Collection<string, import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")>];
	threadMemberUpdate: [import("./structures/ThreadMember")];
	threadMembersUpdate: [import("./structures/Partial/PartialThreadChannel"), { added: import("@discordjs/Collection").Collection<string, import("./structures/ThreadMember")>; removed: import("@discordjs/Collection").Collection<string, import("./structures/Partial/PartialUser")>; }];
	threadUpdate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
	typingStart: [import("./structures/Partial/PartialChannel"), import("./structures/Partial/PartialUser")];
	userUpdate: [import("./structures/User")];
	voiceStateUpdate: [import("./structures/VoiceState")];
	webhookUpdate: [import("./structures/Partial/PartialChannel")];
}

export type ChannelType = Exclude<keyof typeof Constants.ChannelTypes, number | "-1"> | "UNKNOWN";

export type ChannelResolvable = import("./structures/Channel") | string;

/**
 * Can be a number, hex string, an RGB array like:
 * ```js
 * [255, 0, 255] // purple
 * ```
 * or one of the following strings:
 * - `DEFAULT`
 * - `WHITE`
 * - `AQUA`
 * - `GREEN`
 * - `BLUE`
 * - `YELLOW`
 * - `PURPLE`
 * - `LUMINOUS_VIVID_PINK`
 * - `GOLD`
 * - `ORANGE`
 * - `RED`
 * - `GREY`
 * - `DARKER_GREY`
 * - `NAVY`
 * - `DARK_AQUA`
 * - `DARK_GREEN`
 * - `DARK_BLUE`
 * - `DARK_PURPLE`
 * - `DARK_VIVID_PINK`
 * - `DARK_GOLD`
 * - `DARK_ORANGE`
 * - `DARK_RED`
 * - `DARK_GREY`
 * - `LIGHT_GREY`
 * - `DARK_NAVY`
 * - `BLURPLE`
 * - `GREYPLE`
 * - `DARK_BUT_NOT_BLACK`
 * - `NOT_QUITE_BLACK`
 * - `RANDOM`
 */
export type ColorResolvable = keyof typeof Constants.Colors | number | Array<number>;
export type StringResolvable = string | Array<any> | any;
export type BufferResolvable = string | Buffer;

export type MessageMentionTypes = "roles" | "users" | "everyone";

export type MessageMentionOptions = {
	parse?: Array<MessageMentionTypes>;
	users?: Array<string>;
	roles?: Array<string>;
	repliedUser?: boolean;
}

export type BaseMessageOptions = {
	tts?: boolean;
	nonce?: string;
	content?: string;
	embeds?: Array<MessageEmbed>;
	disableEveryone?: boolean;
	allowedMentions?: MessageMentionOptions;
	files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
	code?: string | boolean;
	split?: boolean | SplitOptions;
	components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
}

export interface MessageOptions extends BaseMessageOptions {
	reply?: ReplyOptions;
}

export interface WebhookMessageOptions extends BaseMessageOptions {
	username?: string;
	avatarURL?: string;
}

export type WebhookEditMessageOptions = {
	embeds?: Array<MessageEmbed>;
	content?: StringResolvable;
	files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
	allowedMentions?: MessageMentionOptions;
	components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
}

export type MessageAdditions = MessageEmbed | MessageAttachment | Array<MessageEmbed | MessageAttachment>;

export interface ClientOptions {
	disableEveryone?: boolean;
	snowtransfer: import("snowtransfer").SnowTransfer;
	connectTimeout?: number;
	restGlobalRateLimit?: number;
	restSweepInterval?: number;
}

export type FetchMemberOptions = { Ids?: Array<string>; query?: string; limit?: number; after?: string; };

export type EmbedField = {
	name: string;
	value: string;
	inline?: boolean;
}

export type FileOptions = {
	attachment: BufferResolvable;
	name?: string;
}

export type MessageEmbedThumbnail = {
	url: string;
	proxyURL: string;
	height: number;
	width: number;
}

export type MessageEmbedImage = {
	url: string;
	proxyURL: string;
	height: number;
	width: number;
}

export type MessageEmbedVideo = {
	url: string;
	proxyURL: string;
	height: number;
	width: number;
}

export type MessageEmbedAuthor = {
	name: string;
	url: string;
	iconURL: string;
	proxyIconURL: string;
}

export type MessageEmbedProvider = {
	name: string;
	url: string;
}

export type MessageEmbedFooter = {
	text: string;
	iconURL: string;
	proxyIconURL: string;
}

export type EmbedFieldData = {
	name: StringResolvable;
	value: StringResolvable;
	inline?: boolean
}

export type Feature = import("discord-typings").GuildFeature;

export type BitFieldResolvable<T> = number | bigint | keyof T | import("./util/BitField")<T> | Array<BitFieldResolvable<T>>;

export type PermissionResolvable = BitFieldResolvable<typeof import("./util/Permissions").FLAGS>;

export type UserResolvable = string | import("./structures/User") | import("./structures/GuildMember") | import("./structures/Guild") | import("./structures/Message");

export type MessageResolvable = import("./structures/Message") | import("./structures/Partial/PartialMessage") | string;

export type ReplyOptions = {
	messageReference: MessageResolvable;
	failIfNotExists?: boolean;
}

export type AllowedImageFormat = "webp" | "png" | "jpg" | "jpeg" | "gif";
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

export type ImageURLOptions = {
	format?: AllowedImageFormat;
	size?: ImageSize;
}

export type MessageActivity = {
	partyId?: string;
	type?: number;
}

export type InviteScope = FlattenIfReadonlyArray<typeof Constants.InviteScopes>;

export type MessageType = Exclude<FlattenIfReadonlyArray<typeof Constants.MessageTypes>, null>;
export type SystemMessageType = Exclude<FlattenIfArray<typeof Constants.SystemMessageTypes>, null>

export type ExplicitContentFilterLevel = FlattenIfReadonlyArray<typeof Constants.ExplicitContentFilterLevels>;

export type VerificationLevel = FlattenIfReadonlyArray<typeof Constants.VerificationLevels>;

export type DefaultMessageNotification = FlattenIfReadonlyArray<typeof Constants.DefaultMessageNotifications>;

export type MembershipState = Exclude<FlattenIfReadonlyArray<typeof Constants.MembershipStates>, null>;

export type WebhookType = Exclude<FlattenIfReadonlyArray<typeof Constants.WebhookTypes>, null>;

export type PresenceStatus = import("discord-typings").PresenceUpdateData["status"];

export type ClientPresenceStatus = Exclude<PresenceStatus, "offline">;

export type ActivityType = FlattenIfReadonlyArray<typeof Constants.ActivityTypes>;

export type StickerFormatType = Exclude<keyof typeof Constants.StickerFormatTypes, number>;

export type ApplicationCommandType = Exclude<keyof typeof Constants.ApplicationCommandTypes, number>;

export type ApplicationCommandOptionType = Exclude<keyof typeof Constants.ApplicationCommandOptionTypes, number>;

export type ApplicationCommandPermissionType = Exclude<keyof typeof Constants.ApplicationCommandPermissionTypes, number>;

export type InteractionType = Exclude<keyof typeof Constants.InteractionTypes, number>;

export type InteractionResponseType = Exclude<keyof typeof Constants.InteractionResponseTypes, number>;

export type MessageComponentType = Exclude<keyof typeof Constants.MessageComponentTypes, number>;

export type MessageButtonStyle = Exclude<keyof typeof Constants.MessageButtonStyles, number>;

export type MessageTarget = import("./structures/interfaces/TextBasedChannel") | import("./structures/TextChannel") | import("./structures/DMChannel") | import("./structures/User") | import("./structures/GuildMember") | import("./structures/Webhook") | import("./client/WebhookClient") | import("./structures/Interaction") | import("./structures/Message") | import("./structures/Partial/PartialMessage") | import("./structures/interfaces/InteractionResponses");

// @ts-ignore
export type CollectorFilter<T> = (...args: Array<any>, collection: import("@discordjs/Collection").Collection<string, T>) => boolean | Promise<boolean>;

export type CollectorOptions = {
	time?: number;
	idle?: number;
	dispose?: boolean;
}

export interface MessageCollectorOptions extends CollectorOptions {
	max?: number;
	maxProcessed?: number;
}

export interface AwaitMessagesOptions extends MessageCollectorOptions {
	errors?: Array<string>;
}

export type GuildEmojiEditData = {
	name?: string;
	roles?: import("@discordjs/Collection").Collection<string, import("./structures/Role") | import("./structures/Partial/PartialRole")> | Array<RoleResolvable>;
}

export type RoleResolvable = string | import("./structures/Role") | import("./structures/Partial/PartialRole");

export type ApplicationAsset = {
	id: string;
	name: string;
	type: string;
}

export type ApplicationCommandData = {
	name: string;
	description: string;
	options?: Array<ApplicationCommandOptionData>;
	defaultPermission?: boolean;
}

export type ApplicationCommandOptionData = {
	type: ApplicationCommandOptionType | Exclude<keyof typeof Constants.ApplicationCommandOptionTypes, string>;
	name: string;
	description: string;
	required?: boolean;
	choices?: Array<ApplicationCommandOptionChoice>;
	options?: Array<ApplicationCommandOptionData>;
}


export type ApplicationCommandOption = {
	type: ApplicationCommandOptionType;
	name: string;
	description: string;
	required?: boolean;
	choices?: Array<ApplicationCommandOptionChoice>;
	options?: Array<ApplicationCommandOption>;
}

export type ApplicationCommandOptionChoice = {
	name: string;
	value: string | number;
}

export type ApplicationCommandPermissionData = {
	id: string;
	type: ApplicationCommandPermissionType | Exclude<keyof typeof Constants.ApplicationCommandPermissionTypes, string>;
	permission: boolean;
}

export type GuildApplicationCommandPermissionData = {
	id: string;
	permissions: Array<ApplicationCommandPermissionData>;
}

export type ApplicationCommandPermissions = {
	id: string;
	type: ApplicationCommandPermissionType;
	permission: boolean;
}

export type InteractionDeferOptions = {
	ephemeral?: boolean;
}

export interface InteractionReplyOptions extends BaseMessageOptions {
	ephemeral?: boolean;
}

export type BaseMessageComponentOptions = {
	type: MessageComponentTypeResolvable | null;
}

export type MessageComponentOptions = MessageActionRowOptions | MessageButtonOptions;

export type MessageComponent = import("./structures/MessageActionRow") | import("./structures/MessageButton");

export type MessageComponentTypeResolvable = Exclude<keyof typeof Constants.MessageComponentTypes, string> | MessageComponentType;

export type MessageActionRowComponent = import("./structures/MessageButton") | import("./structures/MessageSelectMenu");

export type MessageActionRowComponentOptions = MessageButtonOptions;

export type MessageActionRowComponentResolvable = MessageActionRowComponent | MessageActionRowComponentOptions;

export interface MessageActionRowOptions extends BaseMessageComponentOptions {
	components: Array<MessageActionRowComponentResolvable>;
}

export interface MessageButtonOptions extends BaseMessageComponentOptions {
	label?: string | null;
	customId?: string | null;
	style?: MessageButtonStyleResolvable | null;
	emoji?: EmojiResolvable | null;
	url?: string | null;
	disabled?: boolean | null;
}

export type MessageButtonStyleResolvable = Exclude<keyof typeof Constants.MessageButtonStyles, string> | MessageButtonStyle;

export type EmojiIdentifierResolvable = string | EmojiResolvable;

export type EmojiResolvable = string | import("./structures/GuildEmoji") | import("./structures/ReactionEmoji") | { id: string | null; name?: string; animated?: boolean };

export interface MessageComponentInteractionCollectorOptions extends CollectorOptions {
	max?: number;
	maxComponents?: number;
	maxUsers?: number;
}

export type DeconstructedSnowflake = {
	timestamp: number;
	date: Date;
	workerId: number;
	processId: number;
	increment: number;
	binary: string;
}

export type ApplicationCommandResolvable = import("./structures/ApplicationCommand") | string;

export type Base64Resolvable = Buffer | string;

export type IntegrationAccount = {
	id: string;
	name: string;
}

export type IntegrationEditData = {
	expireBehavior?: number;
	expireGracePeriod?: number;
}

export type AuditLogAction = NonNullable<keyof typeof import("./structures/GuildAuditLogs")["Actions"] | typeof import("./structures/GuildAuditLogs")["Actions"][keyof typeof import("./structures/GuildAuditLogs")["Actions"]]>;

export type AuditLogTargetType = typeof import("./structures/GuildAuditLogs")["Targets"][keyof typeof import("./structures/GuildAuditLogs")["Targets"]];

export type AuditLogEntryTarget = import("./structures/Guild") | import("./structures/Partial/PartialGuild") | import("./structures/Partial/PartialUser") | import("./structures/Partial/PartialRole") | import("./structures/GuildEmoji") | import("./structures/Invite") | import("./structures/Webhook") | import("./structures/Integration") | { [key: string]: any };

export type AuditLogActionType = "CREATE" | "DELETE" | "UPDATE" | "ALL";

export type AuditLogChange = {
	key: string;
	old: any;
	new: any;
}

export type CommandInteractionOption = {
	name: string;
	type: ApplicationCommandOptionType | "_MESSAGE";
	value?: string | number | boolean;
	focused?: boolean;
	options?: Array<CommandInteractionOption>;
	user?: import("./structures/User");
	member?: import("./structures/GuildMember");
	channel?: import("./structures/Channel");
	role?: import("./structures/Role");
	message?: import("./structures/Message");
}

export interface ReactionCollectorOptions extends CollectorOptions {
	max?: number;
	maxEmojis?: number;
	maxUsers?: number;
}

export type SplitOptions = {
	maxLength?: number;
	char?: string | RegExp;
	prepend?: string;
	append?: string;
}

export interface ReplyMessageOptions extends BaseMessageOptions {
	failIfNotExists?: boolean;
}

export type MessageEditOptions = {
	content?: string | null;
	embeds?: Array<MessageEmbed>;
	code?: string | boolean;
	allowedMentions?: MessageMentionOptions;
	flags?: import("./util/MessageFlags");
	attachments?: Array<MessageAttachment>;
	files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
	components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
	disableEveryone?: boolean;
}

export type MessageReference = {
	channelId: string;
	guildId: string | null;
	messageId: string | null;
}

export type MessageInteraction = {
	id: string;
	type: InteractionType;
	commandName: string;
	user: import("./structures/User");
}

export interface AwaitReactionsOptions extends ReactionCollectorOptions {
	errors?: Array<string>;
}

export type ChannelLogsQueryOptions = {
	limit?: number;
	before?: string;
	after?: string;
	around?: string;
}

export type NSFWLevel = Exclude<keyof typeof Constants.NSFWLevels, number>;

// eslint-disable-next-line no-shadow
export type SweepFilter<K, V> = (collection: import("./util/LimitedCollection")<K, V>) => null | ((value: V, key: K, collection: import ("./util/LimitedCollection")<K, V>) => boolean);

export type LimitedCollectionOptions<K, V> = {
	maxSize?: number | null;
	keepOverLimit?: ((value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => boolean) | null;
	sweepFilter?: SweepFilter<K, V> | null;
	sweepInterval?: number | null;
}

export type LifetimeFilterOptions<K, V> = {
	lifetime?: number;
	getComparisonTimestamp?: (value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => number;
	excludeFromSweep?: (value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => boolean;
}

export type CommandInteractionResolvedData = {
	users?: import("@discordjs/collection").Collection<string, import("./structures/User")>;
	members?: import("@discordjs/collection").Collection<string, import("./structures/GuildMember")>;
	roles?: import("@discordjs/collection").Collection<string, import("./structures/Role")>;
	channels?: import("@discordjs/collection").Collection<string, import("./structures/Channel")>;
	messages?: import("@discordjs/collection").Collection<string, import("./structures/Message")>;
}

export type MessageSelectOption = {
	label: string;
	value: string;
	description: string | null;
	emoji: RawEmoji | null;
	default: boolean;
}

export type MessageSelectOptionData = {
	label: string;
	value: string;
	description?: string;
	emoji?: EmojiIdentifierResolvable;
	default?: boolean;
}

export type RawEmoji = {
	id: string | null;
	name: string | null;
	animated: boolean | null;
}

export interface MessageSelectMenuOptions extends BaseMessageComponentOptions {
	customId?: string;
	placeholder?: string;
	minValues?: number;
	maxValues?: number;
	options?: Array<MessageSelectOption>;
	disabled?: boolean;
}
