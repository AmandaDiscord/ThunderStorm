/// <reference types="node" />
import { Collection } from "@discordjs/collection";
import { _cleanupSymbol } from "./Constants.js";
declare class LimitedCollection<K, V> extends Collection<K, V> {
    maxSize: number;
    keepOverLimit: ((value: V, key: K, col: LimitedCollection<K, V>) => boolean) | null;
    sweepFilter: import("../Types").SweepFilter<K, V> | null;
    interval: NodeJS.Timeout | null;
    static readonly default: typeof LimitedCollection;
    constructor(options: import("../Types").LimitedCollectionOptions<K, V> | undefined, iterable: readonly (readonly [K, V])[] | null);
    set(key: K, value: V): this;
    static filterByLifetime<K1, V1>({ lifetime, getComparisonTimestamp, excludeFromSweep }?: import("../Types").LifetimeFilterOptions<K1, V1>): import("../Types").SweepFilter<K1, V1>;
    [_cleanupSymbol](): (() => void) | null;
    static get [Symbol.species](): typeof Collection;
}
export = LimitedCollection;
