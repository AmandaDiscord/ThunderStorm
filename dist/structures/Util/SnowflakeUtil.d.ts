interface DeconstructedSnowflake {
    timestamp: number;
    date: Date;
    workerID: number;
    processID: number;
    increment: number;
    binary: string;
}
/**
 * A container for useful snowflake-related methods.
 */
declare class SnowflakeUtil {
    /**
     * Discord's epoch value (2015-01-01T00:00:00.000Z).
     * @readonly
     */
    static EPOCH: number;
    constructor();
    /**
     * Generates a Discord snowflake.
     * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
     * @param timestamp Timestamp or date of the snowflake to generate
     * @returns The generated snowflake
     */
    static generate(timestamp?: number | Date): string;
    /**
     * Deconstructs a Discord snowflake.
     * @param snowflake Snowflake to deconstruct
     * @returns Deconstructed snowflake
     */
    static deconstruct(snowflake: string): DeconstructedSnowflake;
}
export = SnowflakeUtil;
