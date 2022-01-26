// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";
import { _cleanupSymbol } from "./Constants.js";
import { TypeError } from "../errors/DJSError.js";

// @ts-ignore
class LimitedCollection<K, V> extends Collection<K, V> {
	public maxSize: number;
	public keepOverLimit: ((value: V, key: K, col: LimitedCollection<K, V>) => boolean) | null;
	public sweepFilter: import("../Types").SweepFilter<K, V> | null;
	public interval: NodeJS.Timeout | null;

	public static readonly default = LimitedCollection;

	public constructor(options: import("../Types").LimitedCollectionOptions<K, V> = {}, iterable: readonly (readonly [K, V])[] | null) {
		if (typeof options !== "object" || options === null) {
			throw new TypeError("INVALID_TYPE", "options", "object", true);
		}
		const { maxSize = Infinity, keepOverLimit = null, sweepInterval = 0, sweepFilter = null } = options;

		if (typeof maxSize !== "number") {
			throw new TypeError("INVALID_TYPE", "maxSize", "number");
		}
		if (keepOverLimit !== null && typeof keepOverLimit !== "function") {
			throw new TypeError("INVALID_TYPE", "keepOverLimit", "function");
		}
		if (typeof sweepInterval !== "number") {
			throw new TypeError("INVALID_TYPE", "sweepInterval", "number");
		}
		if (sweepFilter !== null && typeof sweepFilter !== "function") {
			throw new TypeError("INVALID_TYPE", "sweepFilter", "function");
		}
		super(iterable);

		this.maxSize = maxSize;
		this.keepOverLimit = keepOverLimit;
		this.sweepFilter = sweepFilter;
		this.interval =
			sweepInterval > 0 && sweepInterval !== Infinity && sweepFilter
				? setInterval(() => {
					const sweepFn = this.sweepFilter!(this);
					if (sweepFn === null) return;
					if (typeof sweepFn !== "function") throw new TypeError("SWEEP_FILTER_RETURN");
					this.sweep(sweepFn);
				}, sweepInterval * 1_000).unref()
				: null;
	}

	public set(key: K, value: V) {
		if (this.maxSize === 0) return this;
		if (this.size >= this.maxSize && !this.has(key)) {
			for (const [k, v] of this.entries()) {
				const keep = this.keepOverLimit?.(v, k, this) ?? false;
				if (!keep) {
					this.delete(k);
					break;
				}
			}
		}
		return super.set(key, value);
	}

	public static filterByLifetime<K1, V1>({
		lifetime = 14400,
		getComparisonTimestamp = e => (e as { createdTimestamp?: number })?.createdTimestamp || 0,
		excludeFromSweep = () => false
	}: import("../Types").LifetimeFilterOptions<K1, V1> = {}): import("../Types").SweepFilter<K1, V1> {
		if (typeof lifetime !== "number") {
			throw new TypeError("INVALID_TYPE", "lifetime", "number");
		}
		if (typeof getComparisonTimestamp !== "function") {
			throw new TypeError("INVALID_TYPE", "getComparisonTimestamp", "function");
		}
		if (typeof excludeFromSweep !== "function") {
			throw new TypeError("INVALID_TYPE", "excludeFromSweep", "function");
		}
		return () => {
			if (lifetime <= 0) return null;
			const lifetimeMs = lifetime * 1_000;
			const now = Date.now();
			return (entry, key, coll) => {
				if (excludeFromSweep(entry, key, coll)) {
					return false;
				}
				const comparisonTimestamp = getComparisonTimestamp(entry, key, coll);
				if (!comparisonTimestamp || typeof comparisonTimestamp !== "number") return false;
				return now - comparisonTimestamp > lifetimeMs;
			};
		};
	}

	public [_cleanupSymbol]() {
		return this.interval ? () => clearInterval(this.interval!) : null;
	}

	public static get [Symbol.species]() {
		return Collection;
	}
}

export = LimitedCollection;
