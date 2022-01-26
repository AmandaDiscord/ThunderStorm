"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
const Interaction_1 = __importDefault(require("./Interaction"));
const InteractionWebhook_1 = __importDefault(require("./InteractionWebhook"));
const InteractionResponses_1 = __importDefault(require("./interfaces/InteractionResponses"));
const Constants_1 = require("../util/Constants");
const Util_1 = __importDefault(require("../util/Util"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const User_1 = __importDefault(require("./User"));
const Role_1 = __importDefault(require("./Role"));
const PartialChannel_1 = __importDefault(require("./Partial/PartialChannel"));
// @ts-ignore
class BaseCommandInteraction extends Interaction_1.default {
    constructor(client, data) {
        super(client, data);
        this.deferred = false;
        this.replied = false;
        this.ephemeral = false;
        this.commandId = data.data.id;
        this.commandName = data.data.name;
        this.webhook = new InteractionWebhook_1.default(this.client, this.applicationId, this.token);
    }
    get command() {
        var _a, _b, _c;
        const id = this.commandId;
        return (_c = (_b = (_a = this.guild) === null || _a === void 0 ? void 0 : _a.commands.cache.get(id)) !== null && _b !== void 0 ? _b : this.client.application.commands.cache.get(id)) !== null && _c !== void 0 ? _c : null;
    }
    transformResolved({ members, users, channels, roles, messages }) {
        const result = {};
        const Message = require("./Message");
        if (members) {
            result.members = new collection_1.Collection();
            for (const [id, member] of Object.entries(members)) {
                const user = users[id];
                result.members.set(id, new GuildMember_1.default(this.client, { user, ...member }));
            }
        }
        if (users) {
            result.users = new collection_1.Collection();
            for (const user of Object.values(users)) {
                result.users.set(user.id, new User_1.default(this.client, user));
            }
        }
        if (roles) {
            result.roles = new collection_1.Collection();
            for (const role of Object.values(roles)) {
                result.roles.set(role.id, new Role_1.default(this.client, role));
            }
        }
        if (channels) {
            result.channels = new collection_1.Collection();
            for (const channel of Object.values(channels)) {
                result.channels.set(channel.id, Util_1.default.createChannelFromData(this.client, channel));
            }
        }
        if (messages) {
            result.messages = new collection_1.Collection();
            for (const message of Object.values(messages)) {
                result.messages.set(message.id, new Message(this.client, message, new PartialChannel_1.default(this.client, { id: message.channel_id, guild_id: message.guild_id })));
            }
        }
        return result;
    }
    transformOption(option, resolved) {
        var _a, _b, _c, _d;
        const result = {
            name: option.name,
            type: Constants_1.ApplicationCommandOptionTypes[option.type]
        };
        if ("value" in option)
            result.value = option.value;
        if ("options" in option)
            result.options = option.options.map(opt => this.transformOption(opt, resolved));
        if (resolved) {
            const user = (_a = resolved.users) === null || _a === void 0 ? void 0 : _a[option.value];
            if (user)
                result.user = new User_1.default(this.client, user);
            const member = (_b = resolved.members) === null || _b === void 0 ? void 0 : _b[option.value];
            if (member)
                result.member = new GuildMember_1.default(this.client, { user, ...member });
            const channel = (_c = resolved.channels) === null || _c === void 0 ? void 0 : _c[option.value];
            if (channel)
                result.channel = Util_1.default.createChannelFromData(this.client, channel);
            const role = (_d = resolved.roles) === null || _d === void 0 ? void 0 : _d[option.value];
            if (role)
                result.role = new Role_1.default(this.client, role);
        }
        return result;
    }
}
BaseCommandInteraction.default = BaseCommandInteraction;
InteractionResponses_1.default.applyToClass(BaseCommandInteraction, ["deferUpdate", "update"]);
module.exports = BaseCommandInteraction;
