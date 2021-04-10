const AC: typeof import("@augu/collections") = require("@augu/collections");

import Util from "./Util";

const BaseCollection = AC.Collection;

interface CollectionConstructor {
	new(): Collection<unknown, unknown>;
	new<K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
	readonly prototype: Collection<unknown, unknown>;
	readonly [Symbol.species]: CollectionConstructor;
}

// @ts-ignore Realistically, keys *could* be anything and not just a string | number | symbol
class Collection<K, V> extends BaseCollection<K, V> {
	// @ts-ignore
	public ["constructor"]: typeof Collection;
	public [Symbol.iterator]: () => IterableIterator<[K, V]>;
	public static readonly default: typeof Collection = Collection;
	readonly [Symbol.species]: CollectionConstructor;

	public constructor(from?: ReadonlyArray<readonly [K, V]> | null | undefined) {
		super(from);
	}

	// Added to support Discord.js Collections.
	private get _array(): Array<V> {
		return this.array();
	}

	private get _keyArray(): Array<K> {
		return this.keyArray();
	}

	public keyArray(): Array<K> {
		return this.toKeyArray();
	}

	public array(): Array<V> {
		return this.toArray();
	}

	public randomKey(): K | undefined;
	public randomKey(amount: number): Array<K>;
	public randomKey(amount?: number): K | Array<K> | undefined {
		let arr = this.keyArray();
		if (typeof amount === "undefined") return arr[Math.floor(Math.random() * arr.length)];
		if (arr.length === 0 || !amount) return [];
		arr = arr.slice();
		return Array.from({ length: amount }, (): K => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
	}

	public findKey(fn: (value: V, key: K, collection: this) => boolean): K | null;
	public findKey<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): K | null;
	public findKey(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): K | null {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (fn(val, key, this)) return key;
		}
		return null;
	}

	public sweep(fn: (value: V, key: K, collection: this) => boolean): number;
	public sweep<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): number;
	public sweep(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): number {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		const previousSize = this.size;
		for (const [key, val] of this) {
			if (fn(val, key, this)) this.delete(key);
		}
		return previousSize - this.size;
	}

	public flatMap<T>(fn: (value: V, key: K, collection: this) => Collection<K, T>): Collection<K, T>;
	public flatMap<T, This>(fn: (this: This, value: V, key: K, collection: this) => Collection<K, T>, thisArg: This): Collection<K, T>;
	public flatMap<T>(fn: (value: V, key: K, collection: this) => Collection<K, T>, thisArg?: unknown): Collection<K, T> {
		const collections = this.map(fn, thisArg);
		return (new this.constructor[Symbol.species]() as Collection<K, T>).concat(...collections);
	}

	public mapValues<T>(fn: (value: V, key: K, collection: this) => T): Collection<K, T>;
	public mapValues<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): Collection<K, T>;
	public mapValues<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): Collection<K, T> {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		const coll = new this.constructor[Symbol.species]() as Collection<K, T>;
		for (const [key, val] of this) coll.set(key, fn(val, key, this));
		return coll;
	}

	public every(fn: (value: V, key: K, collection: this) => boolean): boolean;
	public every<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
	public every(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (!fn(val, key, this)) return false;
		}
		return true;
	}

	public some(fn: (value: V, key: K, collection: this) => boolean): boolean;
	public some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
	public some(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (fn(val, key, this)) return true;
		}
		return false;
	}

	public reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initialValue?: T): T {
		let accumulator!: T;

		if (typeof initialValue !== "undefined") {
			accumulator = initialValue;
			for (const [key, val] of this) accumulator = fn(accumulator, val, key, this);
			return accumulator;
		}
		let first = true;
		for (const [key, val] of this) {
			if (first) {
				accumulator = val as unknown as T;
				first = false;
				continue;
			}
			accumulator = fn(accumulator, val, key, this);
		}

		// No items iterated.
		if (first) {
			throw new TypeError("Reduce of empty collection with no initial value");
		}

		return accumulator;
	}

	public each(fn: (value: V, key: K, collection: this) => void): this;
	public each<T>(fn: (this: T, value: V, key: K, collection: this) => void, thisArg: T): this;
	public each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this {
		this.forEach(fn as (value: V, key: K, map: Map<K, V>) => void, thisArg);
		return this;
	}

	public tap(fn: (collection: this) => void): this;
	public tap<T>(fn: (this: T, collection: this) => void, thisArg: T): this;
	public tap(fn: (collection: this) => void, thisArg?: unknown): this {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		fn(this);
		return this;
	}

	public clone(): this {
		return new this.constructor[Symbol.species](this.map((val, key) => [key, val])) as unknown as this;
	}

	public concat(...collections: Collection<K, V>[]): this {
		const newColl = this.clone();
		for (const coll of collections) {
			for (const [key, val] of coll) newColl.set(key, val);
		}
		return newColl;
	}

	public equals(collection: Collection<K, V>): boolean {
		if (!collection) return false;
		if (this === collection) return true;
		if (this.size !== collection.size) return false;
		for (const [key, value] of this) {
			if (!collection.has(key) || value !== collection.get(key)) {
				return false;
			}
		}
		return true;
	}

	public intersect(other: Collection<K, V>): Collection<K, V> {
		return other.filter((_, k) => this.has(k));
	}

	public difference(other: Collection<K, V>): Collection<K, V> {
		return other.filter((_, k) => !this.has(k)).concat(this.filter((_, k) => !other.has(k)));
	}

	public sorted(compareFunction: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number = (x, y): number => Number(x > y) || Number(x === y) - 1): this {
		return (new this.constructor[Symbol.species]([...this.entries()]) as unknown as this)
			.sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
	}

	public partition(fn: (value: V, key: K, collection: this) => boolean): [this, this];
	public partition<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): [this, this];
	public partition(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): [this, this] {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		const results: [this, this] = [new this.constructor[Symbol.species]() as this, new this.constructor[Symbol.species]() as this];
		for (const [key, val] of this) {
			if (fn(val, key, this)) {
				results[0].set(key, val);
			} else {
				results[1].set(key, val);
			}
		}
		return results;
	}

	toJSON() {
		// @ts-ignore
		return this.map(e => (typeof e?.toJSON === "function" ? e.toJSON() : Util.flatten(e)));
	}


	// Modified to support Discord.js Collections.
	// @ts-ignore
	public find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
	// @ts-ignore
	public find<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
	// @ts-ignore
	public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (fn(val, key, this)) return val;
		}
		return undefined;
	}

	// @ts-ignore
	public filter(fn: (value: V, key: K, collection: this) => boolean): this;
	// @ts-ignore
	public filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): this;
	// @ts-ignore
	public filter(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): this {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		const results = new this.constructor[Symbol.species]() as this;
		for (const [key, val] of this) {
			if (fn(val, key, this)) results.set(key, val);
		}
		return results;
	}

	// @ts-ignore
	public map<T>(fn: (value: V, key: K, collection: this) => T): T[];
	// @ts-ignore
	public map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
	// @ts-ignore
	public map<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {
		if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
		const iter = this.entries();
		return Array.from({ length: this.size }, (): T => {
			const [key, value] = iter.next().value;
			return fn(value, key, this);
		});
	}

	// @ts-ignore
	public sort(compareFunction: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number = (x, y): number => Number(x > y) || Number(x === y) - 1): this {
		const entries = [...this.entries()];
		entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));

		super.clear();

		// Set the new entries
		for (const [k, v] of entries) {
			this.set(k, v);
		}
		return this;
	}

	public forEach(callbackfn: (value: V, key: K, collection: Collection<K, V>) => void, thisArg?: any): void {
		// @ts-ignore
		return super.forEach(callbackfn, thisArg);
	}

	// @ts-ignore
	public static from<Ky, Vl>(values: Array<Vl> | Vl | Array<[Ky, Vl]> | Record<Ky, Vl>) {
		const collection = new Collection<Ky, Vl>();
		if (Array.isArray(values) && (values as Array<[Ky, Vl]>).every(item => Array.isArray(item) && item.length === 2)) {
			for (const [key, val] of values as Array<[Ky, Vl]>) {
				collection.set(key, val);
			}
		} else if (Array.isArray(values)) {
			// @ts-ignore
			for (let i = 0; i < values.length; i++) collection.set(i, values[i]);
		} else if (Util.isObject(values)) {
			// @ts-ignore
			for (const [key, value] of Object.entries(values)) collection.set(key, value);
		} else {
			throw new TypeError(`Collection#from requires the values to be an Object or Array, received ${typeof values}`);
		}

		return collection;
	}
}

export = Collection;
