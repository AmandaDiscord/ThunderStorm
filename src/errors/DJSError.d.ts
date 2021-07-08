/// <reference types="node" />
declare const kCode: unique symbol;
interface DiscordjsErrorConstructor {
    new (msg?: string): ReturnType<typeof makeDiscordjsError>;
    new (key: string, ...args: Array<any>): ReturnType<typeof makeDiscordjsError>;
    readonly prototype: ReturnType<typeof makeDiscordjsError>;
    readonly [Symbol.species]: DiscordjsErrorConstructor;
}
declare function makeDiscordjsError(Base: ErrorConstructor): {
    new (key: string, ...args: Array<any>): {
        constructor: any;
        readonly name: string;
        readonly code: string;
        readonly [Symbol.species]: DiscordjsErrorConstructor;
        [kCode]: string;
        message: string;
        stack?: string | undefined;
    };
    readonly default: any;
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
declare function register(sym: string, val: any): void;
declare const DJSError: {
    register: typeof register;
    Error: ReturnType<typeof makeDiscordjsError>;
    TypeError: ReturnType<typeof makeDiscordjsError>;
    RangeError: ReturnType<typeof makeDiscordjsError>;
    Messages: typeof import("./Messages");
};
export = DJSError;
