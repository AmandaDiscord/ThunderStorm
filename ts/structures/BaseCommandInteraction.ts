// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";
import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
import { ApplicationCommandOptionTypes } from "../util/Constants";
import Util from "../util/Util";

import GuildMember from "./GuildMember";
import User from "./User";
import Role from "./Role";
import PartialChannel from "./Partial/PartialChannel";

// @ts-ignore
abstract class BaseCommandInteraction extends Interaction implements InteractionResponses {
	public commandId: string;
	public commandName: string;
	public deferred = false;
	public replied = false;
	public ephemeral: boolean | null = false;
	public webhook: InteractionWebhook;

	public defer!: InteractionResponses["defer"];
	public reply!: InteractionResponses["reply"];
	public fetchReply!: InteractionResponses["fetchReply"];
	public editReply!: InteractionResponses["editReply"];
	public deleteReply!: InteractionResponses["deleteReply"];
	public followUp!: InteractionResponses["followUp"];

	public static readonly default = BaseCommandInteraction;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);
		this.commandId = data.data!.id;
		this.commandName = data.data!.name;
		this.webhook = new InteractionWebhook(this.client, this.applicationId, this.token);
	}

	public get command() {
		const id = this.commandId;
		return this.guild?.commands.cache.get(id) ?? this.client.application!.commands.cache.get(id) ?? null;
	}

	public transformResolved({ members, users, channels, roles, messages }: import("discord-typings").ApplicationCommandInteractionDataResolved) {
		const result: import("../Types").CommandInteractionResolvedData = {};
		const Message = require("./Message") as typeof import("./Message");

		if (members) {
			result.members = new Collection();
			for (const [id, member] of Object.entries(members)) {
				const user = users![id];
				result.members.set(id, new GuildMember(this.client, { user, ...member } as import("discord-typings").MemberData & { user: import("discord-typings").UserData; }));
			}
		}

		if (users) {
			result.users = new Collection();
			for (const user of Object.values(users)) {
				result.users.set(user.id, new User(this.client, user));
			}
		}

		if (roles) {
			result.roles = new Collection();
			for (const role of Object.values(roles)) {
				result.roles.set(role.id, new Role(this.client, role as import("discord-typings").RoleData & { guild_id: string }));
			}
		}

		if (channels) {
			result.channels = new Collection();
			for (const channel of Object.values(channels)) {
				result.channels.set(channel.id as string, Util.createChannelFromData(this.client, channel as import("discord-typings").TextChannelData) as import("./Channel"));
			}
		}

		if (messages) {
			result.messages = new Collection();
			for (const message of Object.values(messages)) {
				result.messages.set(message.id as string, new Message(this.client, message as import("discord-typings").MessageData, new PartialChannel(this.client, { id: message.channel_id as string, guild_id: message.guild_id })));
			}
		}

		return result;
	}

	public transformOption(option: import("discord-typings").ApplicationCommandOptionChoice | import("discord-typings").ApplicationCommandOption | import("discord-typings").ApplicationCommandInteractionDataOption, resolved: import("discord-typings").ApplicationCommandInteractionDataResolved) {
		const result: import("../Types").CommandInteractionOption = {
			name: option.name,
			type: ApplicationCommandOptionTypes[option.type as import("discord-typings").ApplicationCommandOptionType]
		};

		if ("value" in option) result.value = option.value;
		if ("options" in option) result.options = option.options!.map(opt => this.transformOption(opt, resolved));

		if (resolved) {
			const user = resolved.users?.[(option as import("discord-typings").ApplicationCommandOptionChoice).value];
			if (user) result.user = new User(this.client, user);

			const member = resolved.members?.[(option as import("discord-typings").ApplicationCommandOptionChoice).value];
			if (member) result.member = new GuildMember(this.client, { user, ...member } as import("discord-typings").MemberData & { user: import("discord-typings").UserData; });

			const channel = resolved.channels?.[(option as import("discord-typings").ApplicationCommandOptionChoice).value];
			if (channel) result.channel = Util.createChannelFromData(this.client, channel as import("discord-typings").TextChannelData) as import("./Channel");

			const role = resolved.roles?.[(option as import("discord-typings").ApplicationCommandOptionChoice).value];
			if (role) result.role = new Role(this.client, role as import("discord-typings").RoleData & { guild_id: string });
		}

		return result;
	}
}

InteractionResponses.applyToClass(BaseCommandInteraction, ["deferUpdate", "update"]);

export = BaseCommandInteraction;
