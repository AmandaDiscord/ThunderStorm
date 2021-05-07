"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const Channel_1 = __importDefault(require("./Channel"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const User_1 = __importDefault(require("./User"));
class DMChannel extends Channel_1.default {
    constructor(data, client) {
        var _a, _b;
        super(Object.assign({}, data, { name: ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username) || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }), client);
        this.lastMessageID = null;
        this.lastPinAt = null;
        this.lastPinTimestamp = null;
        this.recipients = new Collection_1.default();
        this.type = "dm";
        this._patch(Object.assign({}, data, { name: ((_b = client.user) === null || _b === void 0 ? void 0 : _b.username) || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }));
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
    _patch(data) {
        var _a, _b, _c;
        if (data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (data.last_pin_timestamp !== undefined) {
            this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (data.recipients) {
            this.recipients.clear();
            for (const recipient of data.recipients) {
                if (recipient.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                    (_b = this.client.user) === null || _b === void 0 ? void 0 : _b._patch(recipient);
                this.recipients.set(recipient.id, recipient.id === ((_c = this.client.user) === null || _c === void 0 ? void 0 : _c.id) ? this.client.user : new User_1.default(recipient, this.client));
            }
        }
        super._patch(data);
    }
}
module.exports = DMChannel;
