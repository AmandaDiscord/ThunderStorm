"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class Interaction extends Base_1.default {
    constructor(client, data) {
        var _a, _b;
        super(client);
        const GuildMember = require("./GuildMember");
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const User = require("./User");
        this.type = Constants_1.InteractionTypes[data.type];
        this.id = data.id;
        this.token = data.token;
        this.applicationID = data.application_id;
        this.channelID = (_a = data.channel_id, (_a !== null && _a !== void 0 ? _a : null));
        this.guildID = (_b = data.guild_id, (_b !== null && _b !== void 0 ? _b : null));
        if (data.member) {
            this.member = new GuildMember(this.client, data.member);
            this.user = this.member.user;
        }
        else {
            this.member = null;
            this.user = new User(this.client, data.user);
        }
        this.version = data.version;
        this.channel = data.channel_id ? new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id }) : null;
        this.guild = this.channel && this.channel.guild ? this.channel.guild : (data.guild_id ? new PartialGuild(this.client, { id: data.guild_id }) : null);
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    isCommand() {
        return Constants_1.InteractionTypes[this.type] === Constants_1.InteractionTypes.APPLICATION_COMMAND;
    }
    isMessageComponent() {
        return Constants_1.InteractionTypes[this.type] === Constants_1.InteractionTypes.MESSAGE_COMPONENT;
    }
}
module.exports = Interaction;
