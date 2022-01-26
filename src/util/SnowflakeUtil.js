"use strict";
// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;
let INCREMENT = BigInt(0);
class SnowflakeUtil {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    static generate(timestamp = Date.now()) {
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        if (typeof timestamp !== "number" || isNaN(timestamp)) {
            throw new TypeError(`"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp})`);
        }
        if (INCREMENT >= BigInt(4095))
            INCREMENT = BigInt(0);
        return ((BigInt(timestamp - EPOCH) << BigInt(22)) | (BigInt(1) << BigInt(17)) | INCREMENT++).toString();
    }
    static deconstruct(snowflake) {
        const bigIntSnowflake = BigInt(snowflake);
        return {
            timestamp: Number(bigIntSnowflake >> BigInt(22)) + EPOCH,
            get date() {
                return new Date(this.timestamp);
            },
            workerId: Number((bigIntSnowflake >> BigInt(17)) & BigInt(0b11111)),
            processId: Number((bigIntSnowflake >> BigInt(12)) & BigInt(0b11111)),
            increment: Number(bigIntSnowflake & BigInt(0b111111111111)),
            binary: bigIntSnowflake.toString(2).padStart(64, "0")
        };
    }
    static get EPOCH() {
        return EPOCH;
    }
}
SnowflakeUtil.default = SnowflakeUtil;
module.exports = SnowflakeUtil;
