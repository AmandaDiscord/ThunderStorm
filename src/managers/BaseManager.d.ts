import Collection from "../util/Collection";
declare abstract class BaseManager<T, C extends Collection<string, T>> {
    client: import("../client/Client");
    holds: new (...args: Array<any>) => T;
    cacheType: C["constructor"];
    cache: C;
    constructor(client: import("../client/Client"), iterable: IterableIterator<T> | undefined, holds: new (...args: Array<any>) => T, cacheType?: C["constructor"], ...cacheOptions: ConstructorParameters<C["constructor"]>);
    add(data: T, cache?: boolean, options?: {
        id?: string;
        extras?: Array<any>;
    }): T;
    resolve(idOrInstance: string | T): T | null;
    resolveID(idOrInstance: string | T): string | null;
    valueOf(): C;
}
export = BaseManager;
