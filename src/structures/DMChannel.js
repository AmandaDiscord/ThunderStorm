"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const Channel_1 = __importDefault(require("./Channel"));
const Collection_1 = __importDefault(require("../util/Collection"));
const User_1 = __importDefault(require("./User"));
// @ts-ignore
class DMChannel extends Channel_1.default {
    constructor(client, data) {
        var _a;
        super(client, Object.assign({}, data, { name: ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username) || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }));
        this.recipients = new Collection_1.default();
        this.type = "dm";
    }
    toJSON() {
        const d = Object.assign(super.toJSON(), {
            last_message_id: this.lastMessageID,
            recipients: [...this.recipients.values()].map(u => u.toJSON()),
            type: 1
        });
        if (this.lastPinAt)
            d["last_pin_timestamp"] = this.lastPinAt.toISOString();
        return d;
    }
    _patch(data) {
        var _a, _b, _c;
        super._patch(data);
        if (data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (data.last_pin_timestamp !== undefined) {
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (data.recipients) {
            this.recipients.clear();
            for (const recipient of data.recipients) {
                if (recipient.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                    (_b = this.client.user) === null || _b === void 0 ? void 0 : _b._patch(recipient);
                this.recipients.set(recipient.id, recipient.id === ((_c = this.client.user) === null || _c === void 0 ? void 0 : _c.id) ? this.client.user : new User_1.default(this.client, recipient));
            }
        }
    }
}
TextBasedChannel_1.default.applyToClass(DMChannel, true, ["bulkDelete"]);
module.exports = DMChannel;
