declare const Immutable: typeof import("@augu/immutable");
declare class Collection<K, V> extends Immutable.Collection<V> {
    mutable: boolean;
    ["constructor"]: typeof Collection;
    [Symbol.iterator]: () => IterableIterator<[K, V]>;
    constructor(from?: Array<V> | Array<[K, V]> | Record<string | number | symbol, V> | undefined);
    private get _array();
    private get _keyArray();
    keyArray(): Array<K>;
    array(): Array<V>;
    randomKey(): K | undefined;
    randomKey(amount: number): Array<K>;
    findKey(fn: (value: V, key: K, collection: this) => boolean): K | undefined;
    findKey<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): K | undefined;
    sweep(fn: (value: V, key: K, collection: this) => boolean): number;
    sweep<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): number;
    flatMap<T>(fn: (value: V, key: K, collection: this) => Collection<K, T>): Collection<K, T>;
    flatMap<T, This>(fn: (this: This, value: V, key: K, collection: this) => Collection<K, T>, thisArg: This): Collection<K, T>;
    mapValues<T>(fn: (value: V, key: K, collection: this) => T): Collection<K, T>;
    mapValues<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): Collection<K, T>;
    every(fn: (value: V, key: K, collection: this) => boolean): boolean;
    every<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    some(fn: (value: V, key: K, collection: this) => boolean): boolean;
    some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initialValue?: T): T;
    each(fn: (value: V, key: K, collection: this) => void): this;
    each<T>(fn: (this: T, value: V, key: K, collection: this) => void, thisArg: T): this;
    tap(fn: (collection: this) => void): this;
    tap<T>(fn: (this: T, collection: this) => void, thisArg: T): this;
    clone(): this;
    concat(...collections: Collection<K, V>[]): this;
    equals(collection: Collection<K, V>): boolean;
    intersect(other: Collection<K, V>): Collection<K, V>;
    difference(other: Collection<K, V>): Collection<K, V>;
    sorted(compareFunction?: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number): this;
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    find<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
    filter(fn: (value: V, key: K, collection: this) => boolean): this;
    filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): this;
    partition(fn: (value: V, key: K, collection: this) => boolean): [this, this];
    partition<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): [this, this];
    map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    sort(compareFunction?: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number): this;
    toKeyArray(): Array<K>;
    keys(): IterableIterator<K>;
    firstKey(): K | undefined;
    firstKey(amount: number): Array<K>;
    lastKey(): K | undefined;
    lastKey(amount: number): Array<K>;
    set(key: K, value: V): this;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
    merge(...collections: Array<Collection<K, V>>): Collection<K, V>;
    emplace(key: K, insert: V): V;
    entries(): IterableIterator<[K, V]>;
    sortKeys(compareFn: (this: Collection<K, V>, a: K, b: K) => number): (string | number | bigint)[];
    someKeys(func: (this: Collection<K, V>, key: K) => boolean): boolean;
    forEach(callbackfn: (value: V, key: K, collection: Collection<K, V>) => void, thisArg?: any): void;
    static from<Ky, Vl>(values: Array<Vl> | Vl | Array<[Ky, Vl]> | Record<Ky, Vl>): Collection<Ky, Vl>;
}
export = Collection;
