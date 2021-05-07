"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../Interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
class PartialThreadChannel extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "Thread";
        this.memberCount = 0;
        const PartialGuild = require("./PartialGuild");
        const PartialChannel = require("./PartialChannel");
        this.guild = new PartialGuild({ id: data.guild_id }, client);
        this.parent = new PartialChannel({ id: data.channel_id }, client);
        if (data.number)
            this.memberCount = data.number || 0;
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        var _a;
        return {
            guild_id: ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.id) || null,
            parent_id: this.parent.id,
            member_count: this.memberCount,
            ...super.toJSON()
        };
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
    async deleteMessage(messageID, timeout = 0) {
        await TextBasedChannel_1.default.deleteMessage(this.client, this.id, messageID, timeout);
    }
    async fetchMessage(messageID) {
        const data = await TextBasedChannel_1.default.fetchMessage(this.client, this.id, messageID);
        if (this.guild)
            data.guild = this.guild;
        return data;
    }
    async fetchMessages(options) {
        const data = await TextBasedChannel_1.default.fetchMessages(this.client, this.id, options);
        if (this.guild)
            data.forEach(i => i.guild = this.guild);
        return data;
    }
    sendTyping() {
        return TextBasedChannel_1.default.sendTyping(this.client, this.id);
    }
}
module.exports = PartialThreadChannel;
