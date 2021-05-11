"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const snowflake_1 = require("@sapphire/snowflake");
const Util_1 = __importDefault(require("./Util"));
const EPOCH = Number(snowflake_1.DiscordSnowflake.Epoch);
/**
 * A container for useful snowflake-related methods.
 */
class SnowflakeUtil {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    /**
     * Generates a Discord snowflake.
     * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
     * @param timestamp Timestamp or date of the snowflake to generate
     * @returns The generated snowflake
     */
    static generate(timestamp = Date.now()) {
        return snowflake_1.DiscordSnowflake.generate({ timestamp: timestamp }).toString();
    }
    /**
     * Deconstructs a Discord snowflake.
     * @param snowflake Snowflake to deconstruct
     * @returns Deconstructed snowflake
     */
    static deconstruct(snowflake) {
        const deconstructed = snowflake_1.DiscordSnowflake.deconstruct(snowflake);
        const timestamp = Number(deconstructed.timestamp);
        const returnValue = {
            timestamp: timestamp,
            date: new Date(timestamp),
            workerID: Number(deconstructed.workerID),
            processID: Number(deconstructed.processID),
            increment: Number(deconstructed.increment),
            binary: Util_1.default.idToBinary(snowflake)
        };
        return returnValue;
    }
}
/**
 * Discord's epoch value (2015-01-01T00:00:00.000Z).
 * @readonly
 */
SnowflakeUtil.EPOCH = EPOCH;
module.exports = SnowflakeUtil;
