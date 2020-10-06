import { EventEmitter } from "events";
import "snowtransfer";

import Internal = require("./internal");
import Discord = require("@amanda/discordtypings");

export import handle = require("../handle");
export import Constants = require("../constants");

export import CategoryChannel = require("../structures/CategoryChannel");
export import Channel = require("../structures/Channel");
export import ClientUser = require("../structures/ClientUser");
export import DMChannel = require("../structures/DMChannel");
export import Guild = require("../structures/Guild");
export import GuildChannel = require("../structures/GuildChannel");
export import GuildMember = require("../structures/GuildMember");
export import Invite = require("../structures/Invite");
export import Message = require("../structures/Message");
export import MessageAttachment = require("../structures/MessageAttachment");
export import MessageEmbed = require("../structures/MessageEmbed");
export import NewsChannel = require("../structures/NewsChannel");
export import Role = require("../structures/Role");
export import TextChannel = require("../structures/TextChannel");
export import User = require("../structures/User");
export import VoiceChannel = require("../structures/VoiceChannel");
export import VoiceRegion = require("../structures/VoiceRegion");
export import VoiceState = require("../structures/VoiceState");

export import PartialChannel = require("../structures/Partial/PartialChannel");
export import PartialGuild = require("../structures/Partial/PartialGuild");
export import PartialRole = require("../structures/Partial/PartialRole");
export import PartialUser = require("../structures/Partial/PartialUser");

import SnowTransfer = require("snowtransfer");

export interface ClientEvents {
	channelCreate: [DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel];
	guildCreate: [Guild];
	guildDelete: [PartialGuild];
	guildEmojisUpdate: [Role];
	guildMemberUpdate: [GuildMember];
	guildRoleCreate: [Role];
	guildRoleDelete: [PartialRole];
	guildRoleUpdate: [Role];
	message: [Message];
	messageDelete: [Discord.MessageDeleteData];
	messageUpdate: [Message];
	messageReactionAdd: [Discord.MessageReactionAddData];
	messageReactionRemove: [Discord.MessageReactionRemoveData];
	messageReactionRemoveAll: [Discord.MessageReactionRemoveAllData];
	raw: [Internal.InboundDataType<keyof Internal.CloudStormEventDataTable>];
	ready: [ClientUser];
	shardReady: [number];
	shardResume: [number];
	shardDisconnect: [number, string, boolean];
	voiceStateUpdate: [VoiceState];
}

export interface ClientOptions {
	disableEveryone?: boolean;
	snowtransfer: SnowTransfer;
}

export class Client extends EventEmitter {
	constructor(options: ClientOptions);

	public options: ClientOptions;
	public readyAt: Date;
	public readyTimestamp: number;
	public token: string;
	public uptime: number;
	public user: ClientUser;

	public _snow: SnowTransfer;

	public on<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public once<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public emit<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): any;

	public toString(): string;

	public fetchUser(userID: Discord.Snowflake): Promise<User>;
	public fetchInvite(code: string): Promise<Invite>;
	public fetchVoiceRegions(): Promise<Map<string, VoiceRegion>>;
}

/**
 * Data that can be resolved to give a string. This can be:
 * * A string
 * * An array (joined with a new line delimiter to give a string)
 * * Any value
 */
export type StringResolvable = string | Array<any> | *;
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
