import { Collection } from "@discordjs/collection";
declare abstract class BaseManager<T, C extends Collection<string, T>> {
    client: import("../client/Client");
    holds: new (...args: Array<any>) => T;
    cacheType: C["constructor"];
    cache: C;
    static readonly default: typeof BaseManager;
    constructor(client: import("../client/Client"), iterable?: IterableIterator<T> | undefined, holds: new (...args: Array<any>) => T, cacheType?: C["constructor"], ...cacheOptions?: ConstructorParameters<C["constructor"]>);
    _add(data: T, cache?: boolean, options?: {
        id?: string;
        extras?: Array<any>;
    }): T;
    resolve(idOrInstance: string | T): T | null;
    resolveId(idOrInstance: string | T): string | null;
    valueOf(): C;
}
export = BaseManager;
