// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Util from "./Util";

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1_420_070_400_000;
let INCREMENT = 0;

class SnowflakeUtil {
	public static readonly default = SnowflakeUtil;

	public constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

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
		return Util.binaryToId(BINARY);
	}

	static deconstruct(snowflake: string) {
		// @ts-ignore
		const BINARY = Util.idToBinary(snowflake).toString(2).padStart(64, "0");
		return {
			timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
			get date() {
				return new Date(this.timestamp);
			},
			workerId: parseInt(BINARY.substring(42, 47), 2),
			processId: parseInt(BINARY.substring(47, 52), 2),
			increment: parseInt(BINARY.substring(52, 64), 2),
			binary: BINARY
		} as import("../Types").DeconstructedSnowflake;
	}

	public static get EPOCH() {
		return EPOCH;
	}
}

export = SnowflakeUtil;
