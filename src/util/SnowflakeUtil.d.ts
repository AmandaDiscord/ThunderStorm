declare class SnowflakeUtil {
    static EPOCH: number;
    constructor();
    static generate(timestamp?: number | Date): string;
    static deconstruct(snowflake: string): import("../Types").DeconstructedSnowflake;
}
export = SnowflakeUtil;
