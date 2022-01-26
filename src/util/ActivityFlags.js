"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BitField_1 = __importDefault(require("./BitField"));
const FLAGS = {
    INSTANCE: BigInt(1) << BigInt(0),
    JOIN: BigInt(1) << BigInt(1),
    SPECTATE: BigInt(1) << BigInt(2),
    JOIN_REQUEST: BigInt(1) << BigInt(3),
    SYNC: BigInt(1) << BigInt(4),
    PLAY: BigInt(1) << BigInt(5),
    PARTY_PRIVACY_FRIENDS: BigInt(1) << BigInt(6),
    PARTY_PRIVACY_VOICE_CHANNEL: BigInt(1) << BigInt(7),
    EMBEDDED: BigInt(1) << BigInt(8)
};
class ActivityFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = FLAGS;
    }
}
Symbol.species;
ActivityFlags.default = ActivityFlags;
ActivityFlags.FLAGS = FLAGS;
module.exports = ActivityFlags;
