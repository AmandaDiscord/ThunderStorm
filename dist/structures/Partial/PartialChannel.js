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
        this.type = "unknown";
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        return {
            guild_id: this.guild ? this.guild.id : null,
            type: this.type,
            ...super.toJSON()
        };
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
    async deleteMessage(messageID, timeout = 0) {
        await TextBasedChannel_1.default.deleteMessage(this.client, this.id, messageID, timeout);
    }
    fetchMessage(messageID) {
        return TextBasedChannel_1.default.fetchMessage(this.client, this.id, messageID);
    }
    sendTyping() {
        return TextBasedChannel_1.default.sendTyping(this.client, this.id);
    }
}
module.exports = PartialChannel;
