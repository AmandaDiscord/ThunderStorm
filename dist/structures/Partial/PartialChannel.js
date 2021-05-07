"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../Interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
const PartialGuild_1 = __importDefault(require("./PartialGuild"));
class PartialChannel extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "Channel";
        this.guild = data.guild_id ? new PartialGuild_1.default({ id: data.guild_id }, client) : null;
        this.type = data.type || "unknown";
        this.name = data.name || "unknown";
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        return {
            guild_id: this.guild ? this.guild.id : null,
            type: this.type === "dm" ? 1 : (this.type === "voice" ? 2 : 0),
            name: this.name,
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
module.exports = PartialChannel;
