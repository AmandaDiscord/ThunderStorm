"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BitField_1 = __importDefault(require("./BitField"));
const FLAGS = {
    MANAGED_EMOJI: BigInt(1) << BigInt(2),
    GROUP_DM_CREATE: BigInt(1) << BigInt(4),
    RPC_HAS_CONNECTED: BigInt(1) << BigInt(11),
    GATEWAY_PRESENCE: BigInt(1) << BigInt(12),
    GATEWAY_PRESENCE_LIMITED: BigInt(1) << BigInt(13),
    GATEWAY_GUILD_MEMBERS: BigInt(1) << BigInt(14),
    GATEWAY_GUILD_MEMBERS_LIMITED: BigInt(1) << BigInt(15),
    VERIFICATION_PENDING_GUILD_LIMIT: BigInt(1) << BigInt(16),
    EMBEDDED: BigInt(1) << BigInt(17)
};
class ApplicationFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = FLAGS;
    }
}
Symbol.species;
ApplicationFlags.default = ApplicationFlags;
ApplicationFlags.FLAGS = FLAGS;
module.exports = ApplicationFlags;
