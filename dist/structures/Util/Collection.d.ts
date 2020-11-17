declare const Immutable: typeof import("@augu/immutable");
declare class Collection<_K, V> extends Immutable.Collection<V> {
    constructor(from?: Array<V> | Record<string | number | symbol, V> | undefined);
}
export = Collection;
