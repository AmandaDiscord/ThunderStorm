"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const Channel_1 = __importDefault(require("./Channel"));
const User_1 = __importDefault(require("./User"));
class DMChannel extends Channel_1.default {
    constructor(data, client) {
        data.name = data.recipients ? data.recipients[0].username : "unknown";
        super(data, client);
        this.lastMessageID = data.last_message_id || null;
        this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
        this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        this.recipients = data.recipients ? new Map(data.recipients.map(user => [user.id, new User_1.default(user, client)])) : new Map();
        this.type = "dm";
    }
    toJSON() {
        const d = {
            last_message_id: this.lastMessageID,
            recipients: [...this.recipients.values()].map(u => u.toJSON()),
            type: 1,
            ...super.toJSON()
        };
        if (this.lastPinAt)
            d["last_pin_timestamp"] = this.lastPinAt.toISOString();
        return d;
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
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
module.exports = DMChannel;
