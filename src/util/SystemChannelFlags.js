"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BitField_1 = __importDefault(require("./BitField"));
const FLAGS = {
    SUPPRESS_JOIN_NOTIFICATIONS: BigInt(1) << BigInt(0),
    SUPPRESS_PREMIUM_SUBSCRIPTIONS: BigInt(1) << BigInt(1),
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: BigInt(1) << BigInt(2)
};
class SystemChannelFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = FLAGS;
    }
}
SystemChannelFlags.default = SystemChannelFlags;
SystemChannelFlags.FLAGS = FLAGS;
module.exports = SystemChannelFlags;
