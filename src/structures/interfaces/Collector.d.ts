/// <reference types="node" />
import EventEmitter from "events";
import { Collection } from "@discordjs/collection";
interface CollectorEvents<T> {
    collect: Array<any>;
    dispose: Array<any>;
    end: [Collection<string, T>, string];
}
interface Collector<T> {
    addListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    emit<E extends keyof CollectorEvents<T>>(event: E, ...args: CollectorEvents<T>[E]): boolean;
    eventNames(): Array<keyof CollectorEvents<T>>;
    listenerCount(event: keyof CollectorEvents<T>): number;
    listeners(event: keyof CollectorEvents<T>): Array<(...args: Array<any>) => any>;
    off<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    on<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    once<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    prependListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    prependOnceListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
    rawListeners(event: keyof CollectorEvents<T>): Array<(...args: Array<any>) => any>;
    removeAllListeners(event?: keyof CollectorEvents<T>): this;
    removeListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
}
declare abstract class Collector<T> extends EventEmitter {
    client: import("../../client/Client");
    filter: import("../../Types").CollectorFilter<T>;
    options: import("../../Types").CollectorOptions;
    collected: Collection<string, T>;
    ended: boolean;
    private _timeout;
    private _idletimeout;
    static readonly default: typeof Collector;
    constructor(client: import("../../client/Client"), filter: import("../../Types").CollectorFilter<T>, options?: import("../../Types").CollectorOptions);
    handleCollect(...args: Array<any>): Promise<void>;
    handleDispose(...args: Array<any>): void;
    get next(): Promise<T>;
    stop(reason?: string): void;
    resetTimer(options?: Exclude<import("../../Types").CollectorOptions, "dispose">): void;
    checkEnd(): void;
    [Symbol.asyncIterator](): AsyncGenerator<any, void, unknown>;
    toJSON(): any;
    abstract collect(...args: Array<any>): string | null;
    abstract dispose(...args: Array<any>): string | null;
    abstract get endReason(): string | null;
}
export = Collector;
