"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class NewsChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.type = "news";
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
    toJSON() {
        return {
            type: 5,
            ...super.toJSON()
        };
    }
    sendTyping() {
        return TextBasedChannel_1.default.sendTyping(this.client, this.id);
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
}
module.exports = NewsChannel;
