"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const Channel_1 = __importDefault(require("./Channel"));
const User_1 = __importDefault(require("./User"));
// @ts-ignore
class DMChannel extends Channel_1.default {
    constructor(client, data) {
        var _a;
        super(client, Object.assign({}, data, { name: ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username) || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }));
        this.type = "dm";
    }
    toJSON() {
        const d = Object.assign(super.toJSON(), {
            last_message_id: this.lastMessageID,
            recipients: [this.recipient.toJSON()],
            type: 1
        });
        if (this.lastPinAt)
            d["last_pin_timestamp"] = this.lastPinAt.toISOString();
        return d;
    }
    _patch(data) {
        super._patch(data);
        if (data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (data.last_pin_timestamp !== undefined) {
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (data.recipients)
            this.recipient = new User_1.default(this.client, data.recipients[0]);
    }
}
TextBasedChannel_1.default.applyToClass(DMChannel, true, ["bulkDelete"]);
module.exports = DMChannel;
