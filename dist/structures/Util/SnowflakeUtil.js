"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Util_1 = __importDefault(require("./Util"));
const EPOCH = 1420070400000;
let INCREMENT = 0;
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
        if (INCREMENT >= 4095)
            INCREMENT = 0;
        const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, "0")}0000100000${(INCREMENT++)
            .toString(2)
            .padStart(12, "0")}`;
        return Util_1.default.binaryToID(BINARY);
    }
    static deconstruct(snowflake) {
        const BINARY = Util_1.default.idToBinary(snowflake).toString(2).padStart(64, "0");
        const res = {
            timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
            workerID: parseInt(BINARY.substring(42, 47), 2),
            processID: parseInt(BINARY.substring(47, 52), 2),
            increment: parseInt(BINARY.substring(52, 64), 2),
            binary: BINARY
        };
        Object.defineProperty(res, "date", {
            get: function get() {
                return new Date(this.timestamp);
            },
            enumerable: true
        });
        return res;
    }
    static get EPOCH() {
        return EPOCH;
    }
}
module.exports = SnowflakeUtil;
