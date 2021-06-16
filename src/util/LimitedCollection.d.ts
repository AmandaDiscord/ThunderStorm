import Collection from "./Collection.js";
declare class LimitedCollection<K, V> extends Collection<K, V> {
    maxSize: number;
    constructor(maxSize?: number, iterable?: null);
    set(key: K, value: V): this;
    static get [Symbol.species](): typeof Collection;
}
export = LimitedCollection;
