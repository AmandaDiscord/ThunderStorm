interface BitFieldConstructor {
	new<T>(bits: import("../Types").BitFieldResolvable<T>): BitField<T>;
	readonly prototype: BitField<unknown>;
	readonly [Symbol.species]: BitFieldConstructor;
}

class BitField<T> {
	public ["constructor"]: typeof BitField;
	public static readonly default: typeof BitField = BitField;
	readonly [Symbol.species]: BitFieldConstructor;

	public bitfield: bigint;

	public constructor(bits: import("../Types").BitFieldResolvable<T>) {
		this.bitfield = BitField.resolve(bits);
	}

	public static get FLAGS(): { [flag: string]: bigint } {
		return {};
	}

	public get FLAGS(): { [flag: string]: bigint } {
		return {};
	}

	/**
	 * Checks whether the bitfield has a bit, or any of multiple bits.
	 * @param bit Bit(s) to check for
	 */
	public any(bit: import("../Types").BitFieldResolvable<T>) {
		return (this.bitfield & this.constructor.resolve(bit)) !== BigInt(0);
	}

	/**
	 * Checks if this bitfield equals another
	 * @param bit Bit(s) to check for
	 */
	public equals(bit: import("../Types").BitFieldResolvable<T>) {
		return this.bitfield === this.constructor.resolve(bit);
	}

	/**
	 * Checks whether the bitfield has a bit, or multiple bits.
	 * @param bit Bit(s) to check for
	 */
	public has(bit: import("../Types").BitFieldResolvable<T>): boolean {
		if (Array.isArray(bit)) return bit.every(p => this.has(p));
		bit = BitField.resolve(bit);
		return (this.bitfield & bit) === bit;
	}

	/**
	 * Gets all given bits that are missing from the bitfield.
	 * @param bits Bit(s) to check for
	 */
	public missing(bits: import("../Types").BitFieldResolvable<T>) {
		if (!Array.isArray(bits)) bits = new this.constructor(bits).toArray();
		return (bits as Array<keyof T>).filter(p => !this.has(p));
	}

	/**
	 * Freezes these bits, making them immutable.
	 * @returns These bits
	 */
	public freeze() {
		return Object.freeze(this);
	}

	/**
	 * Adds bits to these ones.
	 * @param bits Bits to add
	 * @returns These bits or new BitField if the instance is frozen.
	 */
	public add(...bits: Array<import("../Types").BitFieldResolvable<T>>): this {
		let total = BigInt(0);
		for (const bit of bits) {
			total |= this.constructor.resolve(bit);
		}
		// @ts-ignore
		if (Object.isFrozen(this)) return new this.constructor(this.bitfield | total);
		this.bitfield |= total;
		return this;
	}

	/**
	 * Removes bits from these.
	 * @param bits Bits to remove
	 * @returns These bits or new BitField if the instance is frozen.
	 */
	public remove(...bits: Array<import("../Types").BitFieldResolvable<T>>): this {
		let total = BigInt(0);
		for (const bit of bits) {
			total |= this.constructor.resolve(bit);
		}
		// @ts-ignore
		if (Object.isFrozen(this)) return new this.constructor(this.bitfield & ~total);
		this.bitfield &= ~total;
		return this;
	}

	/**
	 * Gets an object mapping field names to a {@link boolean} indicating whether the
	 * bit is available.
	 * @param Additional parameters for the has method, if any
	 */
	public serialize() {
		const serialized: { [bit: string]: boolean } = {};
		for (const [flag, bit] of Object.entries(this.constructor.FLAGS)) serialized[flag] = this.has(bit);
		return serialized;
	}

	/**
	 * Gets an {@link Array} of bitfield names based on the bits available.
	 */
	public toArray(): Array<keyof T> {
		// @ts-ignore
		return Object.keys(this.constructor.FLAGS).filter(bit => this.has(bit));
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

	/**
	 * Resolves bitfields to their numeric form.
	 * @param bit - bit(s) to resolve
	 */
	public static resolve(bit: import("../Types").BitFieldResolvable<any> = BigInt(0)): bigint {
		if (typeof bit === "number" && bit >= 0) return BigInt(bit);
		if (typeof bit === "string" && bit.match(/^\d+$/)) return BigInt(bit);
		if (typeof bit === "bigint") return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit)) return bit.map(p => this.resolve(p)).reduce((prev, p) => prev | p, BigInt(0));
		if (typeof bit === "string" && typeof this.FLAGS[bit] !== "undefined") return this.FLAGS[bit];
		if (typeof bit === "string" && typeof this.prototype.FLAGS[bit] !== "undefined") return this.prototype.FLAGS[bit];
		const error = new RangeError("BITFIELD_INVALID");
		throw error;
	}
}

export = BitField;
