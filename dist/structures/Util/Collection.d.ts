/// <reference types="@augu/collections" />
declare const BaseCollection: typeof import("@augu/collections").Collection;
interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
declare class Collection<K, V> extends BaseCollection<K, V> {
    ["constructor"]: typeof Collection;
    [Symbol.iterator]: () => IterableIterator<[K, V]>;
    static readonly default: typeof Collection;
    readonly [Symbol.species]: CollectionConstructor;
    constructor(from?: ReadonlyArray<readonly [K, V]> | null | undefined);
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
    partition(fn: (value: V, key: K, collection: this) => boolean): [this, this];
    partition<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): [this, this];
    toJSON(): any[];
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    find<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
    filter(fn: (value: V, key: K, collection: this) => boolean): this;
    filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): this;
    map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    sort(compareFunction?: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number): this;
    forEach(callbackfn: (value: V, key: K, collection: Collection<K, V>) => void, thisArg?: any): void;
    static from<Ky, Vl>(values: Array<Vl> | Vl | Array<[Ky, Vl]> | Record<Ky, Vl>): Collection<Ky, Vl>;
}
export = Collection;
