// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
interface BitFieldConstructor {
	new<T>(bits: import("../Types").BitFieldResolvable<T>): BitField<T>;
	readonly prototype: BitField<unknown>;
	readonly [Symbol.species]: BitFieldConstructor;
}

class BitField<T> {
	public ["constructor"]: typeof BitField;
	public static readonly default = BitField;
	readonly [Symbol.species]: BitFieldConstructor;

	public static FLAGS: { [flag: string]: bigint } = {};
	public FLAGS: { [flag: string]: bigint } = {};

	public bitfield: bigint;

	public constructor(bits: import("../Types").BitFieldResolvable<T>) {
		this.bitfield = BitField.resolve.call(this, bits);
	}

	public any(bit: import("../Types").BitFieldResolvable<T>) {
		return (this.bitfield & this.constructor.resolve.call(this, bit)) !== BigInt(0);
	}

	public equals(bit: import("../Types").BitFieldResolvable<T>) {
		return this.bitfield === this.constructor.resolve.call(this, bit);
	}

	public has(bit: import("../Types").BitFieldResolvable<T>): boolean {
		if (Array.isArray(bit)) return bit.every(p => this.has(p));
		bit = this.constructor.resolve.call(this, bit);
		return (this.bitfield & bit) === bit;
	}

	public missing(bits: import("../Types").BitFieldResolvable<T>): Array<keyof T> {
		return new this.constructor(bits).remove(this).toArray();
	}

	public freeze() {
		return Object.freeze(this);
	}

	public add(...bits: Array<import("../Types").BitFieldResolvable<T>>): this {
		let total = BigInt(0);
		for (const bit of bits) {
			total |= this.constructor.resolve.call(this, bit);
		}
		if (Object.isFrozen(this)) return new this.constructor(this.bitfield | total) as this;
		this.bitfield |= total;
		return this;
	}

	public remove(...bits: Array<import("../Types").BitFieldResolvable<T>>): this {
		let total = BigInt(0);
		for (const bit of bits) {
			total |= this.constructor.resolve.call(this, bit);
		}

		if (Object.isFrozen(this)) return new this.constructor(this.bitfield & ~total) as this;
		this.bitfield &= ~total;
		return this;
	}

	public serialize() {
		const serialized: { [flag: string]: boolean } = {};
		for (const [flag, bit] of Object.entries(this.constructor.FLAGS)) serialized[flag] = this.has(bit);
		return serialized;
	}

	public toArray(): Array<keyof T> {
		return Object.keys(this.constructor.FLAGS).filter(bit => this.has(bit as import("../Types").BitFieldResolvable<T>)) as Array<keyof T>;
	}

	public toJSON() {
		return { bitfield: this.bitfield };
	}

	public valueOf() {
		return this.bitfield;
	}

	public *[Symbol.iterator]() {
		yield* this.toArray();
	}

	public static resolve(bit: import("../Types").BitFieldResolvable<any> = BigInt(0)): bigint {
		if (typeof bit === "number" && bit >= 0) return BigInt(bit);
		if (typeof bit === "string" && bit.match(/^\d+$/)) return BigInt(bit);
		if (typeof bit === "bigint") return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit)) return bit.map(p => this.resolve.call(this, p)).reduce((prev, p) => prev | p, BigInt(0));
		if (typeof bit === "string" && typeof this.FLAGS[bit] !== "undefined") return this.FLAGS[bit];
		if (typeof bit === "string" && typeof this.prototype.FLAGS[bit] !== "undefined") return this.prototype.FLAGS[bit];
		const error = new RangeError("BITFIELD_INVALID");
		throw error;
	}
}

export = BitField;
