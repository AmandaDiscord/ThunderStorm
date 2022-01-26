// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Integration from "./Integration";
import Webhook from "./Webhook";
import { Collection } from "@discordjs/collection";
import { OverwriteTypes, ChannelTypes } from "../util/Constants";
import SnowflakeUtil from "../util/SnowflakeUtil";
import Util from "../util/Util";

const Targets = {
	ALL: "ALL" as const,
	GUILD: "GUILD" as const,
	CHANNEL: "CHANNEL" as const,
	USER: "USER" as const,
	ROLE: "ROLE" as const,
	INVITE: "INVITE" as const,
	WEBHOOK: "WEBHOOK" as const,
	EMOJI: "EMOJI" as const,
	MESSAGE: "MESSAGE" as const,
	INTEGRATION: "INTEGRATION" as const,
	UNKNOWN: "UNKNOWN" as const
};

const Actions = {
	ALL: null,
	GUILD_UPDATE: 1 as const,
	CHANNEL_CREATE: 10 as const,
	CHANNEL_UPDATE: 11 as const,
	CHANNEL_DELETE: 12 as const,
	CHANNEL_OVERWRITE_CREATE: 13 as const,
	CHANNEL_OVERWRITE_UPDATE: 14 as const,
	CHANNEL_OVERWRITE_DELETE: 15 as const,
	MEMBER_KICK: 20 as const,
	MEMBER_PRUNE: 21 as const,
	MEMBER_BAN_ADD: 22 as const,
	MEMBER_BAN_REMOVE: 23 as const,
	MEMBER_UPDATE: 24 as const,
	MEMBER_ROLE_UPDATE: 25 as const,
	MEMBER_MOVE: 26 as const,
	MEMBER_DISCONNECT: 27 as const,
	BOT_ADD: 28 as const,
	ROLE_CREATE: 30 as const,
	ROLE_UPDATE: 31 as const,
	ROLE_DELETE: 32 as const,
	INVITE_CREATE: 40 as const,
	INVITE_UPDATE: 41 as const,
	INVITE_DELETE: 42 as const,
	WEBHOOK_CREATE: 50 as const,
	WEBHOOK_UPDATE: 51 as const,
	WEBHOOK_DELETE: 52 as const,
	EMOJI_CREATE: 60 as const,
	EMOJI_UPDATE: 61 as const,
	EMOJI_DELETE: 62 as const,
	MESSAGE_DELETE: 72 as const,
	MESSAGE_BULK_DELETE: 73 as const,
	MESSAGE_PIN: 74 as const,
	MESSAGE_UNPIN: 75 as const,
	INTEGRATION_CREATE: 80 as const,
	INTEGRATION_UPDATE: 81 as const,
	INTEGRATION_DELETE: 82 as const,
	STAGE_INSTANCE_CREATE: 83 as const,
	STAGE_INSTANCE_UPDATE: 84 as const,
	STAGE_INSTANCE_DELETE: 85 as const,
	STICKER_CREATE: 90 as const,
	STICKER_UPDATE: 91 as const,
	STICKER_DELETE: 92 as const,
	GUILD_SCHEDULED_EVENT_CREATE: 100 as const,
	GUILD_SCHEDULED_EVENT_UPDATE: 101 as const,
	GUILD_SCHEDULED_EVENT_DELETE: 102 as const,
	THREAD_CREATE: 110 as const,
	THREAD_UPDATE: 111 as const,
	THREAD_DELETE: 112 as const
};

class GuildAuditLogs {
	public static Actions = Actions;
	public static Targets = Targets;
	public static Entry: typeof GuildAuditLogsEntry;

	public webhooks = new Collection<string, Webhook>();
	public integrations = new Collection<string, Integration>();
	public entries = new Collection<string, GuildAuditLogsEntry>();

	public static readonly default = GuildAuditLogs;

	public constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: import("discord-typings").AuditLogObject) {
		if (data.webhooks) {
			for (const hook of data.webhooks) {
				this.webhooks.set(hook.id, new Webhook(guild.client, hook));
			}
		}

		if (data.integrations) {
			for (const integration of data.integrations) {
				this.integrations.set(integration.id, new Integration(guild.client, integration, guild));
			}
		}

		for (const item of data.audit_log_entries) {
			const entry = new GuildAuditLogsEntry(this, guild, item);
			this.entries.set(entry.id, entry);
		}
	}

	public static build(...args: ConstructorParameters<typeof GuildAuditLogs>) {
		const logs = new GuildAuditLogs(...args);
		return Promise.all(logs.entries.map(e => e.target)).then(() => logs);
	}

	public static targetType(target: import("../Types").AuditLogAction): import("../Types").AuditLogTargetType {
		if (target < 10) return Targets.GUILD;
		if (target < 20) return Targets.CHANNEL;
		if (target < 30) return Targets.USER;
		if (target < 40) return Targets.ROLE;
		if (target < 50) return Targets.INVITE;
		if (target < 60) return Targets.WEBHOOK;
		if (target < 70) return Targets.EMOJI;
		if (target < 80) return Targets.MESSAGE;
		if (target < 90) return Targets.INTEGRATION;
		return Targets.UNKNOWN;
	}

	public static actionType(action: import("../Types").AuditLogAction): import("../Types").AuditLogActionType {
		if (
			[
				Actions.CHANNEL_CREATE,
				Actions.CHANNEL_OVERWRITE_CREATE,
				Actions.MEMBER_BAN_REMOVE,
				Actions.BOT_ADD,
				Actions.ROLE_CREATE,
				Actions.INVITE_CREATE,
				Actions.WEBHOOK_CREATE,
				Actions.EMOJI_CREATE,
				Actions.MESSAGE_PIN,
				Actions.INTEGRATION_CREATE,
				Actions.STAGE_INSTANCE_CREATE,
				Actions.STICKER_CREATE,
				Actions.THREAD_CREATE
			].includes(action as any)
		) {
			return "CREATE";
		}

		if (
			[
				Actions.CHANNEL_DELETE,
				Actions.CHANNEL_OVERWRITE_DELETE,
				Actions.MEMBER_KICK,
				Actions.MEMBER_PRUNE,
				Actions.MEMBER_BAN_ADD,
				Actions.MEMBER_DISCONNECT,
				Actions.ROLE_DELETE,
				Actions.INVITE_DELETE,
				Actions.WEBHOOK_DELETE,
				Actions.EMOJI_DELETE,
				Actions.MESSAGE_DELETE,
				Actions.MESSAGE_BULK_DELETE,
				Actions.MESSAGE_UNPIN,
				Actions.INTEGRATION_DELETE,
				Actions.STAGE_INSTANCE_DELETE,
				Actions.STICKER_DELETE,
				Actions.THREAD_DELETE
			].includes(action as any)
		) {
			return "DELETE";
		}

		if (
			[
				Actions.GUILD_UPDATE,
				Actions.CHANNEL_UPDATE,
				Actions.CHANNEL_OVERWRITE_UPDATE,
				Actions.MEMBER_UPDATE,
				Actions.MEMBER_ROLE_UPDATE,
				Actions.MEMBER_MOVE,
				Actions.ROLE_UPDATE,
				Actions.INVITE_UPDATE,
				Actions.WEBHOOK_UPDATE,
				Actions.EMOJI_UPDATE,
				Actions.INTEGRATION_UPDATE,
				Actions.STAGE_INSTANCE_UPDATE,
				Actions.STICKER_UPDATE,
				Actions.THREAD_UPDATE
			].includes(action as any)
		) {
			return "UPDATE";
		}

		return "ALL";
	}

	toJSON() {
		return Util.flatten(this);
	}
}

class GuildAuditLogsEntry {
	public targetType: import("../Types").AuditLogTargetType;
	public actionType: import("../Types").AuditLogActionType;
	public action: import("../Types").AuditLogAction;
	public reason: string | null;
	public executor: import("./Partial/PartialUser") | null;
	public changes: Array<import("../Types").AuditLogChange>;
	public id: string;
	public extra: import("./Partial/PartialUser") | import("./Partial/PartialRole") | import("./Role") | { removed?: number; days?: number; channel?: import("./Partial/PartialChannel"); count?: number; messageId?: string; } | null;
	public target: import("../Types").AuditLogEntryTarget | null;

	public constructor(logs: GuildAuditLogs, guild: import("./Guild") | import("./Partial/PartialGuild"), data: import("discord-typings").AuditLogEntry) {
		const targetType = GuildAuditLogs.targetType(data.action_type);
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");

		this.targetType = targetType;
		this.actionType = GuildAuditLogs.actionType(data.action_type);
		this.action = Object.keys(Actions).find((k: any) => Actions[k as keyof typeof Actions] === data.action_type) as import("../Types").AuditLogAction;
		this.reason = data.reason || null;
		this.executor = data.user_id ? new PartialUser(guild.client, { id: data.user_id }) : null;
		this.changes = data.changes ? data.changes.map(c => ({ key: c.key, old: c.old_value, new: c.new_value })) : [];
		this.id = data.id;

		this.extra = null;
		switch (data.action_type) {
		case Actions.MEMBER_PRUNE:
			this.extra = {
				removed: Number(data.options?.members_removed),
				days: Number(data.options?.delete_member_days)
			};
			break;

		case Actions.MEMBER_MOVE:
		case Actions.MESSAGE_DELETE:
		case Actions.MESSAGE_BULK_DELETE:
			this.extra = {
				channel: new PartialChannel(guild.client, { id: data.options?.channel_id as string, guild_id: guild.id, type: ChannelTypes[0] }),
				count: Number(data.options?.count)
			};
			break;

		case Actions.MESSAGE_PIN:
		case Actions.MESSAGE_UNPIN:
			this.extra = {
				channel: new PartialChannel(guild.client, { id: data.options?.channel_id as string, guild_id: guild.id, type: ChannelTypes[0] }),
				messageId: data.options?.message_id
			};
			break;

		case Actions.MEMBER_DISCONNECT:
			this.extra = {
				count: Number(data.options?.count)
			};
			break;

		case Actions.CHANNEL_OVERWRITE_CREATE:
		case Actions.CHANNEL_OVERWRITE_UPDATE:
		case Actions.CHANNEL_OVERWRITE_DELETE:
			switch (Number(data.options?.type)) {
			case OverwriteTypes.role:
				this.extra = new PartialRole(guild.client, { id: data.options?.id as string, name: data.options?.role_name });
				break;

			case OverwriteTypes.member:
				this.extra = new PartialUser(guild.client, { id: data.options?.id as string });
				break;

			default:
				break;
			}
			break;

		default:
			break;
		}

		this.target = null;
		if (targetType === Targets.UNKNOWN) {
			this.target = this.changes.reduce((o, c) => {
				o[c.key] = c.new || c.old;
				return o;
			}, {} as { [key: string]: any }) as import("../Types").AuditLogEntryTarget;
			(this.target as Exclude<import("../Types").AuditLogEntryTarget, import("./Invite")>).id = data.target_id;
			// MEMBER_DISCONNECT and similar types do not provide a target_id.
		} else if (targetType === Targets.USER && data.target_id) {
			this.target = new PartialUser(guild.client, { id: data.target_id });
		} else if (targetType === Targets.GUILD) {
			this.target = data.target_id === guild.id ? guild : new PartialGuild(guild.client, { id: data.target_id as string });
		} else if (targetType === Targets.WEBHOOK) {
			this.target =
				logs.webhooks.get(data.target_id as string) ||
				new Webhook(
					guild.client,
					this.changes.reduce(
						(o, c) => {
							o[c.key] = c.new || c.old;
							return o;
						},
						{
							id: data.target_id,
							guild_id: guild.id
						} as any
					)
				);
		} else if (targetType === Targets.INVITE) {
			this.target = guild.me;
			guild.fetchInvites().then(invites => {
				const change = this.changes.find(c => c.key === "code");
				const target = invites.find(i => i.code === (change?.new || change?.old));
				if (target) this.target = target;
				else throw new Error("NO_TARGET");
			}).catch(() => {
				this.target = this.changes.reduce((o, c) => {
					o[c.key] = c.new || c.old;
					return o;
				}, {} as any);
			});
		} else if (targetType === Targets.MESSAGE) {
			// Discord sends a channel id for the MESSAGE_BULK_DELETE action type.
			this.target =
				data.action_type === Actions.MESSAGE_BULK_DELETE
					? new PartialChannel(guild.client, { id: data.target_id as string, guild_id: guild.id, type: ChannelTypes[0] })
					: new PartialUser(guild.client, { id: data.target_id as string });
		} else if (targetType === Targets.INTEGRATION) {
			this.target =
				logs.integrations.get(data.target_id as string) ||
				new Integration(
					guild.client,
					this.changes.reduce(
						(o, c) => {
							o[c.key] = c.new || c.old;
							return o;
						},
						{ id: data.target_id } as any
					),
					guild
				);
		} else if (data.target_id) {
			this.target = { id: data.target_id };
		}
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public toJSON() {
		return Util.flatten(this, { createdTimestamp: true });
	}
}

GuildAuditLogs.Entry = GuildAuditLogsEntry;

export = GuildAuditLogs;
