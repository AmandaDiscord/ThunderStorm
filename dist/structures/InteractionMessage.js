"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
class InteractionMessage {
    constructor(data, client) {
        this.channel = null;
        this.guild = null;
        this.member = null;
        this.command = null;
        this.component = null;
        this.message = null;
        this.client = client;
        this._patch(data);
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    /**
     * ACK an interaction ping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     * Alternatively, return { type: 1 } in your route handler.
     */
    pong() {
        return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 1 });
    }
    /**
     * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     */
    async reply(content, options = {}) {
        const payload = await TextBasedChannel_1.default.transform(content, options, false, true);
        // @ts-ignore
        return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 4, data: payload });
    }
    /**
     * For the most part, equivalent to TextableChannel.sendTyping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     */
    think() {
        return this.client._snow.interaction.createInteractionResponse(this.id, this.token, { type: 5 });
    }
    async getOriginal() {
        const Message = require("./Message");
        const msg = await this.client._snow.interaction.getOriginalInteractionResponse(this.applicationID, this.token);
        if (this.guild)
            msg.guild_id = this.guild.id;
        return new Message(msg, this.client);
    }
    async editOriginal(content, options = {}) {
        const payload = await TextBasedChannel_1.default.transform(content, options, true, true);
        // @ts-ignore
        return this.client._snow.interaction.editOriginalInteractionResponse(this.applicationID, this.token, payload);
    }
    async followup(content, options = {}) {
        const payload = await TextBasedChannel_1.default.transform(content, options, false, true);
        // @ts-ignore
        return this.client._snow.interaction.createFollowupMessage(this.id, this.token, { type: 4, data: payload });
    }
    toJSON() {
        var _a, _b, _c, _d, _e;
        return {
            type: this.type === "ping" ? 1 : this.type === "command" ? 2 : 3,
            id: this.id,
            application_id: this.applicationID,
            channel_id: ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.id) || null,
            guild_id: ((_b = this.guild) === null || _b === void 0 ? void 0 : _b.id) || null,
            member: ((_c = this.member) === null || _c === void 0 ? void 0 : _c.toJSON()) || null,
            user: ((_d = this.author) === null || _d === void 0 ? void 0 : _d.toJSON()) || null,
            token: this.token,
            version: this.version,
            data: this.command ? this.command.toJSON() : this.component || null,
            message: ((_e = this.message) === null || _e === void 0 ? void 0 : _e.toJSON()) || null
        };
    }
    _patch(data) {
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const GuildMember = require("./GuildMember");
        const InteractionCommand = require("./InteractionCommand");
        const User = require("./User");
        const Message = require("./Message");
        if (data.type)
            this.type = data.type === 1 ? "ping" : data.type === 2 ? "command" : "button";
        if (data.id)
            this.id = data.id;
        if (data.application_id)
            this.applicationID = data.application_id;
        if (data.channel_id)
            this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, this.client);
        if (data.guild_id)
            this.guild = new PartialGuild({ id: data.guild_id }, this.client);
        if (data.member)
            this.member = new GuildMember(data.member, this.client);
        if (data.user || this.member)
            this.author = data.user ? new User(data.user, this.client) : this.member.user;
        if (data.token)
            this.token = data.token;
        if (data.version)
            this.version = data.version;
        if (data.data && !data.data.component_type)
            this.command = new InteractionCommand(this, data.data);
        if (data.data && data.data.component_type)
            this.component = { id: data.data.custom_id, type: data.data.component_type };
        if (data.message !== undefined)
            this.message = data.message ? new Message(data.message, this.client) : null;
    }
}
module.exports = InteractionMessage;
