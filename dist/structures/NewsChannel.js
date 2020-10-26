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
    fetchMessage(messageID) {
        return TextBasedChannel_1.default.fetchMessage(this.client, this.id, messageID);
    }
}
module.exports = NewsChannel;
