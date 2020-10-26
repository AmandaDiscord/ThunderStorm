import SnowTransfer from "snowtransfer";

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
