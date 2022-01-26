"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BitField_1 = __importDefault(require("./BitField"));
const FLAGS = {
    CROSSPOSTED: BigInt(1) << BigInt(0),
    IS_CROSSPOST: BigInt(1) << BigInt(1),
    SUPPRESS_EMBEDS: BigInt(1) << BigInt(2),
    SOURCE_MESSAGE_DELETED: BigInt(1) << BigInt(3),
    URGENT: BigInt(1) << BigInt(4),
    HAS_THREAD: BigInt(1) << BigInt(5),
    EPHEMERAL: BigInt(1) << BigInt(6),
    LOADING: BigInt(1) << BigInt(7)
};
class MessageFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = FLAGS;
    }
}
Symbol.species;
MessageFlags.default = MessageFlags;
MessageFlags.FLAGS = FLAGS;
module.exports = MessageFlags;
