import { EventEmitter } from "events";
import SnowTransfer = require("snowtransfer");

import Internal = require("./internal");

export import handle = require("../handle");

export import CategoryChannel = require("../structures/CategoryChannel");
export import Channel = require("../structures/Channel");
export import ClientUser = require("../structures/ClientUser");
export import DMChannel = require("../structures/DMChannel");
export import Guild = require("../structures/Guild");
export import GuildChannel = require("../structures/GuildChannel");
export import GuildMember = require("../structures/GuildMember");
export import Message = require("../structures/Message");
export import NewsChannel = require("../structures/NewsChannel");
export import TextChannel = require("../structures/TextChannel");
export import User = require("../structures/User");
export import VoiceChannel = require("../structures/VoiceChannel");
export import VoiceState = require("../structures/VoiceState");

export interface ClientEvents {
	channelCreate: [DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel];
	channelPinsUpdate: [];
	guildCreate: [Guild];
	guildEmojisUpdate: [];
	message: [Message];
	messageDelete: [Internal.MessageDeleteData];
	messageUpdate: [Message];
	messageReactionAdd: [Internal.MessageReactionAddData];
	messageReactionRemove: [Internal.MessageReactionRemoveData];
	messageReactionRemoveAll: [Internal.MessageReactionRemoveAllData];
	raw: [Internal.InboundDataType<keyof Internal.CloudStormEventDataTable>];
	ready: [ClientUser];
	shardReady: [number];
	shardResume: [number];
	shardDisconnect: [number, string, boolean];
	voiceStateUpdate: [VoiceState];
}

export interface ClientOptions {
	disableEveryone?: boolean;
	snowtransfer: typeof SnowTransfer.prototype;
}

export class Client extends EventEmitter {
	constructor(options: ClientOptions);

	public user: ClientUser;
	public token: string;

	public _snow: typeof SnowTransfer.prototype;

	public on<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public once<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public emit<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): any;
}
