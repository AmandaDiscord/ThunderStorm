import { EventEmitter } from "events";
import Internal = require("./internal");
import SnowTransfer = require("snowtransfer");
import CloudStorm = require("cloudstorm");

export import ClientUser = require("../structures/ClientUser");
export import User = require("../structures/User");

export import Message = require("../structures/Message");

export import Guild = require("../structures/Guild");

export import Member = require("../structures/member");

export import Channel = require("../structures/Channel");
export import DMChannel = require("../structures/DMChannel");
export import TextChannel = require("../structures/TextChannel");
export import VoiceChannel = require("../structures/VoiceChannel");

export import VoiceState = require("../structures/VoiceState");

export interface ClientEvents {
	channelCreate: [DMChannel | TextChannel | VoiceChannel];
	channelPinsUpdate: [];
	guildCreate: [Guild];
	guildEmojisUpdate: [];
	message: [Message];
	messageDelete: [Internal.MessageDeleteData];
	messageUpdate: [Message];
	messageReactionAdd: [Internal.MessageReactionAddData];
	messageReactionRemove: [Internal.MessageReactionRemoveData];
	messageReactionRemoveAll: [Internal.MessageReactionRemoveAllData];
	raw: [Internal.InboundDataType<keyof Internal.CloudStormEventDataTable>]
	ready: [ClientUser];
	shardReady: [number];
	shardResume: [number];
	shardDisconnect: [number, string, boolean];
	voiceStateUpdate: [VoiceState];
}

export interface ClientOptions {
	disableEveryone?: boolean;
	snowtransfer: typeof SnowTransfer.prototype;
	cloudstorm: CloudStorm.Client;
}

export class Client extends EventEmitter {
	constructor(options: ClientOptions);

	public user: ClientUser;
	public token: string;

	public _snow: typeof SnowTransfer.prototype;
	public _cloud: CloudStorm.Client;

	public _handle(data: Internal.InboundDataType<keyof Internal.CloudStormEventDataTable>, client: Client): void;
	public on<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public once<E extends keyof ClientEvents>(event: E, handler: (...args: ClientEvents[E]) => any): any;
	public emit<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): any;
}
