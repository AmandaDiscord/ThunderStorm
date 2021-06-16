"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Interaction_1 = __importDefault(require("./Interaction"));
const InteractionWebhook_1 = __importDefault(require("./InteractionWebhook"));
const InteractionResponses_1 = __importDefault(require("./interfaces/InteractionResponses"));
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = require("../util/Constants");
// @ts-ignore
class CommandInteraction extends Interaction_1.default {
    constructor(client, data) {
        var _a, _b, _c, _d;
        super(client, data);
        this.deferred = false;
        this.replied = false;
        this.commandID = (_a = data.data) === null || _a === void 0 ? void 0 : _a.id;
        this.commandName = (_b = data.data) === null || _b === void 0 ? void 0 : _b.name;
        this.options = this._createOptionsCollection((_c = data.data) === null || _c === void 0 ? void 0 : _c.options, (_d = data.data) === null || _d === void 0 ? void 0 : _d.resolved);
        this.webhook = new InteractionWebhook_1.default(this.client, this.applicationID, this.token);
    }
    get command() {
        var _a, _b, _c, _d;
        const id = this.commandID;
        return _d = (_b = (_a = this.guild) === null || _a === void 0 ? void 0 : _a.commands.cache.get(id), (_b !== null && _b !== void 0 ? _b : (_c = this.client.application) === null || _c === void 0 ? void 0 : _c.commands.cache.get(id))), (_d !== null && _d !== void 0 ? _d : null);
    }
    transformOption(option, resolved) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const User = require("./User");
        const GuildMember = require("./GuildMember");
        const TextChannel = require("./TextChannel");
        const GuildChannel = require("./GuildChannel");
        const VoiceChannel = require("./VoiceChannel");
        const CategoryChannel = require("./CategoryChannel");
        const NewsChannel = require("./NewsChannel");
        const StoreChannel = require("./StoreChannel");
        const StageChannel = require("./StageChannel");
        const Role = require("./Role");
        const result = {
            name: option.name,
            type: Constants_1.ApplicationCommandOptionTypes[option.type]
        };
        if ("value" in option)
            result.value = option.value;
        if ("options" in option)
            result.options = this._createOptionsCollection(option.options, resolved);
        const user = (_b = (_a = resolved) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b[option.value];
        if (user)
            result.user = new User(this.client, user);
        const member = (_d = (_c = resolved) === null || _c === void 0 ? void 0 : _c.members) === null || _d === void 0 ? void 0 : _d[option.value];
        if (member)
            result.member = new GuildMember(this.client, { user: user, ...member });
        const channel = (_f = (_e = resolved) === null || _e === void 0 ? void 0 : _e.channels) === null || _f === void 0 ? void 0 : _f[option.value];
        if (channel) {
            let chan;
            if (channel.type === 0 && this.guild)
                chan = new TextChannel(this.guild, channel);
            else if (channel.type === 2 && this.guild)
                chan = new VoiceChannel(this.guild, channel);
            else if (channel.type === 4 && this.guild)
                chan = new CategoryChannel(this.guild, channel);
            else if (channel.type === 5 && this.guild)
                chan = new NewsChannel(this.guild, channel);
            else if (channel.type === 6 && this.guild)
                chan = new StoreChannel(this.guild, channel);
            else if (channel.type === 13 && this.guild)
                chan = new StageChannel(this.guild, channel);
            else if (this.guild)
                chan = new GuildChannel(this.guild, channel);
            else
                throw new Error("NO_GUILD_FOR_INTERACTION_GUILD_CHANNEL");
            if (this.guild)
                chan.guild = this.guild;
            result.channel = chan;
        }
        const role = (_h = (_g = resolved) === null || _g === void 0 ? void 0 : _g.roles) === null || _h === void 0 ? void 0 : _h[option.value];
        if (role)
            result.role = new Role(this.client, Object.assign({}, role, { guild_id: this.guildID }));
        return result;
    }
    _createOptionsCollection(options, resolved) {
        const optionsCollection = new Collection_1.default();
        if (typeof options === "undefined")
            return optionsCollection;
        for (const option of options) {
            optionsCollection.set(option.name, this.transformOption(option, resolved));
        }
        return optionsCollection;
    }
}
InteractionResponses_1.default.applyToClass(CommandInteraction, ["deferUpdate", "update"]);
module.exports = CommandInteraction;
