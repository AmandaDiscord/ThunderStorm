interface DeconstructedSnowflake {
    timestamp: number;
    date: Date;
    workerID: number;
    processID: number;
    increment: number;
    binary: string;
}
declare class SnowflakeUtil {
    constructor();
    static generate(timestamp?: number | Date): string;
    static deconstruct(snowflake: string): DeconstructedSnowflake;
    static get EPOCH(): number;
}
export = SnowflakeUtil;
