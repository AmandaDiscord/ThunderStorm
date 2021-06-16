import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
import Collection from "../util/Collection";
import { ApplicationCommandOptionTypes } from "../util/Constants";

// @ts-ignore
class CommandInteraction extends Interaction implements InteractionResponses {
	public defer!: InteractionResponses["defer"];
	public reply!: InteractionResponses["reply"];
	public fetchReply!: InteractionResponses["fetchReply"];
	public editReply!: InteractionResponses["editReply"];
	public deleteReply!: InteractionResponses["deleteReply"];
	public followUp!: InteractionResponses["followUp"];

	public commandID: string;
	public commandName: string;
	public channel: any;
	public deferred = false;
	public options: Collection<string, import("../Types").CommandInteractionOption>;
	public replied = false;
	public webhook: InteractionWebhook;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").InteractionData) {
		super(client, data);

		this.commandID = data.data?.id as string;
		this.commandName = data.data?.name as string;
		this.options = this._createOptionsCollection(data.data?.options as Array<any>, data.data?.resolved as any);
		this.webhook = new InteractionWebhook(this.client, this.applicationID, this.token);
	}

	public get command() {
		const id = this.commandID;
		return this.guild?.commands.cache.get(id) ?? this.client.application?.commands.cache.get(id) ?? null;
	}

	public transformOption(option: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption, resolved: import("@amanda/discordtypings").ApplicationCommandInteractionDataResolved) {
		const User: typeof import("./User") = require("./User");
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		const TextChannel: typeof import("./TextChannel") = require("./TextChannel");
		const GuildChannel: typeof import("./GuildChannel") = require("./GuildChannel");
		const VoiceChannel: typeof import("./VoiceChannel") = require("./VoiceChannel");
		const CategoryChannel: typeof import("./CategoryChannel") = require("./CategoryChannel");
		const NewsChannel: typeof import("./NewsChannel") = require("./NewsChannel");
		const StoreChannel: typeof import("./StoreChannel") = require("./StoreChannel");
		const StageChannel: typeof import("./StageChannel") = require("./StageChannel");
		const Role: typeof import("./Role") = require("./Role");

		const result: import("../Types").CommandInteractionOption = {
			name: option.name,
			type: ApplicationCommandOptionTypes[option.type]
		};

		if ("value" in option) result.value = option.value;
		if ("options" in option) result.options = this._createOptionsCollection(option.options as Array<any>, resolved);

		const user = resolved?.users?.[option.value as string];
		if (user) result.user = new User(this.client, user);

		const member = resolved?.members?.[option.value as string];
		if (member) result.member = new GuildMember(this.client, { user: user as import("@amanda/discordtypings").UserData, ...member });

		const channel = resolved?.channels?.[option.value as string];
		if (channel) {
			let chan;
			if (channel.type === 0 && this.guild) chan = new TextChannel(this.guild, channel as any);
			else if (channel.type === 2 && this.guild) chan = new VoiceChannel(this.guild, channel as any);
			else if (channel.type === 4 && this.guild) chan = new CategoryChannel(this.guild, channel as any);
			else if (channel.type === 5 && this.guild) chan = new NewsChannel(this.guild, channel as any);
			else if (channel.type === 6 && this.guild) chan = new StoreChannel(this.guild, channel as any);
			else if (channel.type === 13 && this.guild) chan = new StageChannel(this.guild, channel as any);
			else if (this.guild) chan = new GuildChannel(this.guild, channel as any);
			else throw new Error("NO_GUILD_FOR_INTERACTION_GUILD_CHANNEL");
			if (this.guild) chan.guild = this.guild;
			result.channel = chan;
		}

		const role = resolved?.roles?.[option.value as string];
		if (role) result.role = new Role(this.client, Object.assign({}, role, { guild_id: this.guildID as string }));

		return result;
	}

	public _createOptionsCollection(options: Array<import("@amanda/discordtypings").ApplicationCommandInteractionDataOption>, resolved: import("@amanda/discordtypings").ApplicationCommandInteractionDataResolved) {
		const optionsCollection = new Collection<string, import("../Types").CommandInteractionOption>();
		if (typeof options === "undefined") return optionsCollection;
		for (const option of options) {
			optionsCollection.set(option.name, this.transformOption(option, resolved));
		}
		return optionsCollection;
	}
}

InteractionResponses.applyToClass(CommandInteraction, ["deferUpdate", "update"]);

export = CommandInteraction;
