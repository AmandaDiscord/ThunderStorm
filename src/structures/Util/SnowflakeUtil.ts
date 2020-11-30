"use strict";

import Util from "./Util";

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;
let INCREMENT = 0;

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
	static generate(timestamp: number | Date = Date.now()) {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		if (typeof timestamp !== "number" || isNaN(timestamp)) {
			throw new TypeError(
				`"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp})`
			);
		}
		if (INCREMENT >= 4095) INCREMENT = 0;
		const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, "0")}0000100000${(INCREMENT++)
			.toString(2)
			.padStart(12, "0")}`;
		return Util.binaryToID(BINARY);
	}

	/**
	 * Deconstructs a Discord snowflake.
	 * @param snowflake Snowflake to deconstruct
	 * @returns Deconstructed snowflake
	 */
	static deconstruct(snowflake: string) {
		// @ts-ignore
		const BINARY = Util.idToBinary(snowflake).toString(2).padStart(64, "0");
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

	/**
	 * Discord's epoch value (2015-01-01T00:00:00.000Z).
	 * @type {number}
	 * @readonly
	 */
	static get EPOCH() {
		return EPOCH;
	}
}

export = SnowflakeUtil;
