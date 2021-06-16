"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const snowflake_1 = require("@sapphire/snowflake");
const Util_1 = __importDefault(require("./Util"));
const EPOCH = Number(snowflake_1.DiscordSnowflake.Epoch);
class SnowflakeUtil {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    static generate(timestamp = Date.now()) {
        return snowflake_1.DiscordSnowflake.generate({ timestamp: timestamp }).toString();
    }
    static deconstruct(snowflake) {
        const deconstructed = snowflake_1.DiscordSnowflake.deconstruct(snowflake);
        const timestamp = Number(deconstructed.timestamp);
        return {
            timestamp: timestamp,
            date: new Date(timestamp),
            workerID: Number(deconstructed.workerID),
            processID: Number(deconstructed.processID),
            increment: Number(deconstructed.increment),
            binary: Util_1.default.idToBinary(snowflake)
        };
    }
}
SnowflakeUtil.EPOCH = EPOCH;
module.exports = SnowflakeUtil;
