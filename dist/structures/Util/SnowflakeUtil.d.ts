declare class SnowflakeUtil {
    constructor();
    static generate(timestamp?: number | Date): string;
    static deconstruct(snowflake: string): {
        timestamp: number;
        workerID: number;
        processID: number;
        increment: number;
        binary: string;
    };
    static get EPOCH(): number;
}
export = SnowflakeUtil;
