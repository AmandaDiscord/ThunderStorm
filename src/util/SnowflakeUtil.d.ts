declare class SnowflakeUtil {
    static readonly default: typeof SnowflakeUtil;
    constructor();
    static generate(timestamp?: number | Date): string;
    static deconstruct(snowflake: string): import("../Types").DeconstructedSnowflake;
    static get EPOCH(): number;
}
export = SnowflakeUtil;
