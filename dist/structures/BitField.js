"use strict";
class BitField {
    constructor(bits) {
        this.FLAGS = {};
        this.bitfield = BitField.resolve.call(this, bits);
    }
    /**
     * Checks whether the bitfield has a bit, or any of multiple bits.
     * @param bit Bit(s) to check for
     */
    any(bit) {
        return (this.bitfield & this.constructor.resolve.call(this, bit)) !== BigInt(0);
    }
    /**
     * Checks if this bitfield equals another
     * @param bit Bit(s) to check for
     */
    equals(bit) {
        return this.bitfield === this.constructor.resolve.call(this, bit);
    }
    /**
     * Checks whether the bitfield has a bit, or multiple bits.
     * @param bit Bit(s) to check for
     */
    has(bit) {
        if (Array.isArray(bit))
            return bit.every(p => this.has(p));
        bit = this.constructor.resolve.call(this, bit);
        return (this.bitfield & bit) === bit;
    }
    /**
     * Gets all given bits that are missing from the bitfield.
     * @param bits Bit(s) to check for
     */
    missing(bits) {
        if (!Array.isArray(bits))
            bits = new this.constructor(bits).toArray();
        return bits.filter(p => !this.has(p));
    }
    /**
     * Freezes these bits, making them immutable.
     * @returns These bits
     */
    freeze() {
        return Object.freeze(this);
    }
    /**
     * Adds bits to these ones.
     * @param bits Bits to add
     * @returns These bits or new BitField if the instance is frozen.
     */
    add(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve.call(this, bit);
        }
        // @ts-ignore
        if (Object.isFrozen(this))
            return new this.constructor(this.bitfield | total);
        this.bitfield |= total;
        return this;
    }
    /**
     * Removes bits from these.
     * @param bits Bits to remove
     * @returns These bits or new BitField if the instance is frozen.
     */
    remove(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve.call(this, bit);
        }
        // @ts-ignore
        if (Object.isFrozen(this))
            return new this.constructor(this.bitfield & ~total);
        this.bitfield &= ~total;
        return this;
    }
    /**
     * Gets an object mapping field names to a {@link boolean} indicating whether the
     * bit is available.
     * @param Additional parameters for the has method, if any
     */
    serialize() {
        const serialized = {};
        for (const [flag, bit] of Object.entries(this.constructor.FLAGS))
            serialized[flag] = this.has(bit);
        return serialized;
    }
    /**
     * Gets an {@link Array} of bitfield names based on the bits available.
     */
    toArray() {
        // @ts-ignore
        return Object.keys(this.constructor.FLAGS).filter(bit => this.has(bit));
    }
    toJSON() {
        return { bitfield: this.bitfield };
    }
    valueOf() {
        return this.bitfield;
    }
    *[Symbol.iterator]() {
        yield* this.toArray();
    }
    /**
     * Resolves bitfields to their numeric form.
     * @param bit - bit(s) to resolve
     */
    static resolve(bit = BigInt(0)) {
        if (typeof bit === "number" && bit >= 0)
            return BigInt(bit);
        if (typeof bit === "string" && bit.match(/^\d+$/))
            return BigInt(bit);
        if (typeof bit === "bigint")
            return bit;
        if (bit instanceof BitField)
            return bit.bitfield;
        if (Array.isArray(bit))
            return bit.map(p => this.resolve.call(this, p)).reduce((prev, p) => prev | p, BigInt(0));
        if (typeof bit === "string" && typeof this.FLAGS[bit] !== "undefined")
            return this.FLAGS[bit];
        if (typeof bit === "string" && typeof this.prototype.FLAGS[bit] !== "undefined")
            return this.prototype.FLAGS[bit];
        const error = new RangeError("BITFIELD_INVALID");
        throw error;
    }
}
BitField.default = BitField;
BitField.FLAGS = {};
module.exports = BitField;
