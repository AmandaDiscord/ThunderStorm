"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Integration_1 = __importDefault(require("./Integration"));
const Webhook_1 = __importDefault(require("./Webhook"));
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
const Util_1 = __importDefault(require("../util/Util"));
const Targets = {
    ALL: "ALL",
    GUILD: "GUILD",
    CHANNEL: "CHANNEL",
    USER: "USER",
    ROLE: "ROLE",
    INVITE: "INVITE",
    WEBHOOK: "WEBHOOK",
    EMOJI: "EMOJI",
    MESSAGE: "MESSAGE",
    INTEGRATION: "INTEGRATION",
    UNKNOWN: "UNKNOWN"
};
const Actions = {
    ALL: null,
    GUILD_UPDATE: 1,
    CHANNEL_CREATE: 10,
    CHANNEL_UPDATE: 11,
    CHANNEL_DELETE: 12,
    CHANNEL_OVERWRITE_CREATE: 13,
    CHANNEL_OVERWRITE_UPDATE: 14,
    CHANNEL_OVERWRITE_DELETE: 15,
    MEMBER_KICK: 20,
    MEMBER_PRUNE: 21,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_ROLE_UPDATE: 25,
    MEMBER_MOVE: 26,
    MEMBER_DISCONNECT: 27,
    BOT_ADD: 28,
    ROLE_CREATE: 30,
    ROLE_UPDATE: 31,
    ROLE_DELETE: 32,
    INVITE_CREATE: 40,
    INVITE_UPDATE: 41,
    INVITE_DELETE: 42,
    WEBHOOK_CREATE: 50,
    WEBHOOK_UPDATE: 51,
    WEBHOOK_DELETE: 52,
    EMOJI_CREATE: 60,
    EMOJI_UPDATE: 61,
    EMOJI_DELETE: 62,
    MESSAGE_DELETE: 72,
    MESSAGE_BULK_DELETE: 73,
    MESSAGE_PIN: 74,
    MESSAGE_UNPIN: 75,
    INTEGRATION_CREATE: 80,
    INTEGRATION_UPDATE: 81,
    INTEGRATION_DELETE: 82,
    STAGE_INSTANCE_CREATE: 83,
    STAGE_INSTANCE_UPDATE: 84,
    STAGE_INSTANCE_DELETE: 85
};
class GuildAuditLogs {
    constructor(guild, data) {
        this.webhooks = new Collection_1.default();
        this.integrations = new Collection_1.default();
        this.entries = new Collection_1.default();
        if (data.webhooks) {
            for (const hook of data.webhooks) {
                this.webhooks.set(hook.id, new Webhook_1.default(guild.client, hook));
            }
        }
        // @ts-ignore
        if (data.integrations) {
            // @ts-ignore
            for (const integration of data.integrations) {
                this.integrations.set(integration.id, new Integration_1.default(guild.client, integration, guild));
            }
        }
        for (const item of data.audit_log_entries) {
            const entry = new GuildAuditLogsEntry(this, guild, item);
            this.entries.set(entry.id, entry);
        }
    }
    static build(...args) {
        const logs = new GuildAuditLogs(...args);
        return Promise.all(logs.entries.map(e => e.target)).then(() => logs);
    }
    static targetType(target) {
        if (target < 10)
            return Targets.GUILD;
        if (target < 20)
            return Targets.CHANNEL;
        if (target < 30)
            return Targets.USER;
        if (target < 40)
            return Targets.ROLE;
        if (target < 50)
            return Targets.INVITE;
        if (target < 60)
            return Targets.WEBHOOK;
        if (target < 70)
            return Targets.EMOJI;
        if (target < 80)
            return Targets.MESSAGE;
        if (target < 90)
            return Targets.INTEGRATION;
        return Targets.UNKNOWN;
    }
    static actionType(action) {
        if ([
            Actions.CHANNEL_CREATE,
            Actions.CHANNEL_OVERWRITE_CREATE,
            Actions.MEMBER_BAN_REMOVE,
            Actions.BOT_ADD,
            Actions.ROLE_CREATE,
            Actions.INVITE_CREATE,
            Actions.WEBHOOK_CREATE,
            Actions.EMOJI_CREATE,
            Actions.MESSAGE_PIN,
            Actions.INTEGRATION_CREATE
            // @ts-ignore
        ].includes(action)) {
            return "CREATE";
        }
        if ([
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
            Actions.INTEGRATION_DELETE
            // @ts-ignore
        ].includes(action)) {
            return "DELETE";
        }
        if ([
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
            Actions.INTEGRATION_UPDATE
            // @ts-ignore
        ].includes(action)) {
            return "UPDATE";
        }
        return "ALL";
    }
    toJSON() {
        return Util_1.default.flatten(this);
    }
}
GuildAuditLogs.Actions = Actions;
GuildAuditLogs.Targets = Targets;
class GuildAuditLogsEntry {
    constructor(logs, guild, data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const targetType = GuildAuditLogs.targetType(data.action_type);
        const PartialUser = require("./Partial/PartialUser");
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialRole = require("./Partial/PartialRole");
        const PartialGuild = require("./Partial/PartialGuild");
        this.targetType = targetType;
        this.actionType = GuildAuditLogs.actionType(data.action_type);
        this.action = Object.keys(Actions).find((k) => Actions[k] === data.action_type);
        this.reason = data.reason || null;
        this.executor = data.user_id ? new PartialUser(guild.client, { id: data.user_id }) : null;
        this.changes = data.changes ? data.changes.map(c => ({ key: c.key, old: c.old_value, new: c.new_value })) : [];
        this.id = data.id;
        this.extra = null;
        switch (data.action_type) {
            case Actions.MEMBER_PRUNE:
                this.extra = {
                    removed: Number((_a = data.options) === null || _a === void 0 ? void 0 : _a.members_removed),
                    days: Number((_b = data.options) === null || _b === void 0 ? void 0 : _b.delete_member_days)
                };
                break;
            case Actions.MEMBER_MOVE:
            case Actions.MESSAGE_DELETE:
            case Actions.MESSAGE_BULK_DELETE:
                this.extra = {
                    channel: new PartialChannel(guild.client, { id: (_c = data.options) === null || _c === void 0 ? void 0 : _c.channel_id, guild_id: guild.id, type: "text" }),
                    count: Number((_d = data.options) === null || _d === void 0 ? void 0 : _d.count)
                };
                break;
            case Actions.MESSAGE_PIN:
            case Actions.MESSAGE_UNPIN:
                this.extra = {
                    channel: new PartialChannel(guild.client, { id: (_e = data.options) === null || _e === void 0 ? void 0 : _e.channel_id, guild_id: guild.id, type: "text" }),
                    messageID: (_f = data.options) === null || _f === void 0 ? void 0 : _f.message_id
                };
                break;
            case Actions.MEMBER_DISCONNECT:
                this.extra = {
                    count: Number((_g = data.options) === null || _g === void 0 ? void 0 : _g.count)
                };
                break;
            case Actions.CHANNEL_OVERWRITE_CREATE:
            case Actions.CHANNEL_OVERWRITE_UPDATE:
            case Actions.CHANNEL_OVERWRITE_DELETE:
                switch (Number((_h = data.options) === null || _h === void 0 ? void 0 : _h.type)) {
                    case Constants_1.OverwriteTypes.role:
                        this.extra = new PartialRole(guild.client, { id: (_j = data.options) === null || _j === void 0 ? void 0 : _j.id, name: (_k = data.options) === null || _k === void 0 ? void 0 : _k.role_name });
                        break;
                    case Constants_1.OverwriteTypes.member:
                        this.extra = new PartialUser(guild.client, { id: (_l = data.options) === null || _l === void 0 ? void 0 : _l.id });
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
            }, {});
            // @ts-ignore
            this.target.id = data.target_id;
            // MEMBER_DISCONNECT and similar types do not provide a target_id.
        }
        else if (targetType === Targets.USER && data.target_id) {
            this.target = new PartialUser(guild.client, { id: data.target_id });
        }
        else if (targetType === Targets.GUILD) {
            this.target = data.target_id === guild.id ? guild : new PartialGuild(guild.client, { id: data.target_id });
        }
        else if (targetType === Targets.WEBHOOK) {
            this.target =
                logs.webhooks.get(data.target_id) ||
                    new Webhook_1.default(guild.client, 
                    // @ts-ignore
                    this.changes.reduce((o, c) => {
                        o[c.key] = c.new || c.old;
                        return o;
                    }, {
                        id: data.target_id,
                        guild_id: guild.id
                    }));
        }
        else if (targetType === Targets.INVITE) {
            this.target = guild.me;
            guild.fetchInvites().then(invites => {
                const change = this.changes.find(c => c.key === "code");
                const target = invites.find(i => i.code === ((change === null || change === void 0 ? void 0 : change.new) || (change === null || change === void 0 ? void 0 : change.old)));
                if (target)
                    this.target = target;
                else
                    throw new Error("NO_TARGET");
            }).catch(() => {
                this.target = this.changes.reduce((o, c) => {
                    o[c.key] = c.new || c.old;
                    return o;
                }, {});
            });
        }
        else if (targetType === Targets.MESSAGE) {
            // Discord sends a channel id for the MESSAGE_BULK_DELETE action type.
            this.target =
                data.action_type === Actions.MESSAGE_BULK_DELETE
                    ? new PartialChannel(guild.client, { id: data.target_id, guild_id: guild.id, type: "text" })
                    : new PartialUser(guild.client, { id: data.target_id });
        }
        else if (targetType === Targets.INTEGRATION) {
            this.target =
                logs.integrations.get(data.target_id) ||
                    new Integration_1.default(guild.client, this.changes.reduce((o, c) => {
                        o[c.key] = c.new || c.old;
                        return o;
                    }, { id: data.target_id }), guild);
        }
        else if (data.target_id) {
            this.target = { id: data.target_id };
        }
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    toJSON() {
        return Util_1.default.flatten(this, { createdTimestamp: true });
    }
}
GuildAuditLogs.Entry = GuildAuditLogsEntry;
module.exports = GuildAuditLogs;
