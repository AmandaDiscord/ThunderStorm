// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { DiscordSnowflake } from "@sapphire/snowflake";

import Util from "./Util";

const EPOCH = Number(DiscordSnowflake.Epoch);

class SnowflakeUtil {
	public static EPOCH = EPOCH;

	public static readonly default = SnowflakeUtil;

	public constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	static generate(timestamp: number | Date = Date.now()) {
		return DiscordSnowflake.generate({ timestamp: timestamp }).toString();
	}

	static deconstruct(snowflake: string) {
		const deconstructed = DiscordSnowflake.deconstruct(snowflake);
		const timestamp = Number(deconstructed.timestamp);
		return {
			timestamp: timestamp,
			date: new Date(timestamp),
			workerId: Number(deconstructed.workerID),
			processId: Number(deconstructed.processID),
			increment: Number(deconstructed.increment),
			binary: Util.idToBinary(snowflake)
		} as import("../Types").DeconstructedSnowflake;
	}
}

export = SnowflakeUtil;
