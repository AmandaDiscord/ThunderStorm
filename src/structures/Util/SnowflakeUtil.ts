"use strict";

import { DiscordSnowflake } from "@sapphire/snowflake";

import Util from "./Util";

interface DeconstructedSnowflake {
	timestamp: number;
	date: Date;
	workerID: number;
	processID: number;
	increment: number;
	binary: string;
}

const EPOCH = Number(DiscordSnowflake.Epoch);

/**
 * A container for useful snowflake-related methods.
 */
class SnowflakeUtil {
	/**
	 * Discord's epoch value (2015-01-01T00:00:00.000Z).
	 * @readonly
	 */
	public static EPOCH = EPOCH;

	public constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	/**
	 * Generates a Discord snowflake.
	 * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
	 * @param timestamp Timestamp or date of the snowflake to generate
	 * @returns The generated snowflake
	 */
	static generate(timestamp: number | Date = Date.now()) {
		return DiscordSnowflake.generate({ timestamp: timestamp }).toString();
	}

	/**
	 * Deconstructs a Discord snowflake.
	 * @param snowflake Snowflake to deconstruct
	 * @returns Deconstructed snowflake
	 */
	static deconstruct(snowflake: string) {
		const deconstructed = DiscordSnowflake.deconstruct(snowflake);
		const timestamp = Number(deconstructed.timestamp);
		const returnValue: DeconstructedSnowflake = {
			timestamp: timestamp,
			date: new Date(timestamp),
			workerID: Number(deconstructed.workerID),
			processID: Number(deconstructed.processID),
			increment: Number(deconstructed.increment),
			binary: Util.idToBinary(snowflake)
		};
		return returnValue;
	}
}

export = SnowflakeUtil;
