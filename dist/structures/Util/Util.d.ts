export declare function isObject(d: any): boolean;
export declare function flatten(obj: any, ...props: Array<{
    [s: string]: boolean | string;
}>): any;
export declare function basename(path: string, ext?: string): string;
export declare function resolveColor(color: import("../../Types").ColorResolvable | undefined): number;
export declare function resolveString(data: import("../../Types").StringResolvable): string;
export declare function cloneObject<T>(obj: T): T;
export declare function binaryToID(num: string): string;
export declare function idToBinary(num: string): string;
export declare const SnowflakeUtil: {
    generate(timestamp?: number | Date): string;
    deconstruct(snowflake: string): {
        timestamp: number;
        workerID: number;
        processID: number;
        increment: number;
        binary: string;
    };
};
declare const _default: {
    isObject: typeof isObject;
    flatten: typeof flatten;
    basename: typeof basename;
    resolveColor: typeof resolveColor;
    resolveString: typeof resolveString;
    cloneObject: typeof cloneObject;
    SnowflakeUtil: {
        generate(timestamp?: number | Date): string;
        deconstruct(snowflake: string): {
            timestamp: number;
            workerID: number;
            processID: number;
            increment: number;
            binary: string;
        };
    };
};
export default _default;
