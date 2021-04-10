import SnowTransfer from "snowtransfer";

import Constants from "./Constants";

import MessageEmbed from "./structures/MessageEmbed";
import MessageAttachment from "./structures/MessageAttachment";

export interface ClientEvents {
	channelCreate: [import("./structures/DMChannel") | import("./structures/TextChannel") | import("./structures/VoiceChannel") | import("./structures/CategoryChannel") | import("./structures/NewsChannel")];
	guildCreate: [import("./structures/Guild")];
	guildDelete: [import("./structures/Partial/PartialGuild")];
	guildEmojisUpdate: [import("./structures/Role")];
	guildMemberUpdate: [import("./structures/GuildMember")];
	guildRoleCreate: [import("./structures/Role")];
	guildRoleDelete: [import("./structures/Partial/PartialRole")];
	guildRoleUpdate: [import("./structures/Role")];
	message: [import("./structures/Message")];
	messageDelete: [import("@amanda/discordtypings").MessageDeleteData];
	messageUpdate: [import("./structures/Message")];
	messageReactionAdd: [import("@amanda/discordtypings").MessageReactionAddData];
	messageReactionRemove: [import("@amanda/discordtypings").MessageReactionRemoveData];
	messageReactionRemoveAll: [import("@amanda/discordtypings").MessageReactionRemoveAllData];
	raw: [import("./internal").InboundDataType<keyof import("./internal").CloudStormEventDataTable>];
	ready: [import("./structures/ClientUser")];
	shardReady: [number];
	shardResume: [number];
	shardDisconnect: [number, string, boolean];
	voiceStateUpdate: [import("./structures/VoiceState")];
}

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
/**
 * Data that can be resolved to give a string. This can be:
 * * A string
 * * An array (joined with a new line delimiter to give a string)
 * * Any value
 */
export type StringResolvable = string | Array<any> | any;
/**
 * Data that can be resolved to give a Buffer. This can be:
 * * A Buffer
 * * The path to a local file
 * * A URL
 */
export type BufferResolvable = string | Buffer;
export type MessageOptions = {
	tts?: boolean;
	nonce?: string;
	content?: string;
	embed?: MessageEmbed;
	disableEveryone?: boolean;
	file?: MessageAttachment;
}

export interface ClientOptions {
	disableEveryone?: boolean;
	snowtransfer: SnowTransfer;
}

export type FetchMemberOptions = { ids?: Array<string>; query?: string; limit?: number; after?: string; };

/**
 * Represents a field of a MessageEmbed
 */
export type EmbedField = {
	/**
	 * The name of this field
	 */
	name: string;
	/**
	 * The value of this field
	 */
	value: string;
	/**
	 * If this field will be displayed inline
	 */
	inline: boolean;
}

export type FileOptions = {
	/**
	 * File to attach
	 */
	attachment: BufferResolvable;
	/**
	 * Filename of the attachment
	 */
	name?: string;
}

/**
 * Represents the thumbnail of a MessageEmbed
 */
export type MessageEmbedThumbnail = {
	/**
	 * URL for this thumbnail
	 */
	url: string;
	/**
	 * ProxyURL for this thumbnail
	 */
	proxyURL: string;
	/**
	 * Height of this thumbnail
	 */
	height: number;
	/**
	 * Width of this thumbnail
	 */
	width: number;
}

/**
 * Represents the image of a MessageEmbed
 */
export type MessageEmbedImage = {
	/**
	 * URL for this image
	 */
	url: string;
	/**
	 * ProxyURL for this image
	 */
	proxyURL: string;
	/**
	 * Height of this image
	 */
	height: number;
	/**
	 * Width of this image
	 */
	width: number;
}

/**
 * Represents the video of a MessageEmbed
 */
export type MessageEmbedVideo = {
	/**
	 * URL of this video
	 */
	url: string;
	/**
	 * ProxyURL for this video
	 */
	proxyURL: string;
	/**
	 * Height of this video
	 */
	height: number;
	/**
	 * Width of this video
	 */
	width: number;
}

/**
 * Represents the author field of a MessageEmbed
 */
export type MessageEmbedAuthor = {
	/**
	 * The name of this author
	 */
	name: string;
	/**
	 * URL of this author
	 */
	url: string;
	/**
	 * URL of the icon for this author
	 */
	iconURL: string;
	/**
	 * Proxied URL of the icon for this author
	 */
	proxyIconURL: string;
}

/**
 * Represents the provider of a MessageEmbed
 */
export type MessageEmbedProvider = {
	/**
	 * The name of this provider
	 */
	name: string;
	/**
	 * URL of this provider
	 */
	url: string;
}

/**
 * Represents the footer field of a MessageEmbed
 */
export type MessageEmbedFooter = {
	/**
	 * The text of this footer
	 */
	text: string;
	/**
	 * URL of the icon for this footer
	 */
	iconURL: string;
	/**
	 * Proxied URL of the icon for this footer
	 */
	proxyIconURL: string;
}

export type EmbedFieldData = {
	name: StringResolvable;
	value: StringResolvable;
	inline?: boolean
}

export type BitFieldResolvable<T> = string | number | bigint | keyof T | Array<BitFieldResolvable<T>>;

export type PermissionResolvable = BitFieldResolvable<typeof Constants.PERMISSION_FLAGS>;
