import Collection from "./Collection.js";

// @ts-ignore
class LimitedCollection<K, V> extends Collection<K, V> {
	public maxSize: number;

	public constructor(maxSize = 0, iterable = null) {
		super(iterable);
		this.maxSize = maxSize;
	}

	public set(key: K, value: V) {
		if (this.maxSize === 0) return this;
		if (this.size >= this.maxSize && !this.has(key)) this.delete(this.firstKey() as K);
		return super.set(key, value);
	}

	static get [Symbol.species]() {
		return Collection;
	}
}

export = LimitedCollection;
