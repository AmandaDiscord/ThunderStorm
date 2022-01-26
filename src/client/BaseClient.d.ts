/// <reference types="node" />
import EventEmitter from "events";
declare class BaseClient extends EventEmitter {
    private _timeouts;
    private _intervals;
    private _immediates;
    options: import("../Types").ClientOptions;
    rest: import("../rest/RESTManager");
    _snow: import("snowtransfer").SnowTransfer;
    token: string;
    accessToken: string | null;
    static readonly default: typeof BaseClient;
    constructor(options: import("../Types").ClientOptions);
    get api(): import("../internal").Route;
    destroy(): void;
    setTimeout(fn: (...args: Array<any>) => any, delay: number, ...args: any[]): NodeJS.Timeout;
    clearTimeout(timeout: NodeJS.Timeout): void;
    setInterval(fn: (...args: Array<any>) => any, delay: number, ...args: any[]): NodeJS.Timeout;
    clearInterval(interval: NodeJS.Timeout): void;
    setImmediate(fn: (...args: Array<any>) => any, ...args: any[]): NodeJS.Immediate;
    clearImmediate(immediate: NodeJS.Immediate): void;
    incrementMaxListeners(): void;
    decrementMaxListeners(): void;
    toJSON(...props: Array<any>): any;
}
export = BaseClient;
