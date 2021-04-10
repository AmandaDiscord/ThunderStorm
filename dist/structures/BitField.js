"use strict";
class BitField {
    constructor(bits) {
        this.bitfield = BitField.resolve(bits);
    }
    static get FLAGS() {
        return {};
    }
    any(bit) {
        return (this.bitfield & this.constructor.resolve(bit)) !== BigInt(0);
    }
    equals(bit) {
        return this.bitfield === this.constructor.resolve(bit);
    }
    has(bit) {
        if (Array.isArray(bit))
            return bit.every(p => this.has(p));
        bit = BitField.resolve(bit);
        return (this.bitfield & bit) === bit;
    }
    missing(bits) {
        if (!Array.isArray(bits))
            bits = new this.constructor(bits).toArray();
        return bits.filter(p => !this.has(p));
    }
    freeze() {
        return Object.freeze(this);
    }
    add(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve(bit);
        }
        if (Object.isFrozen(this))
            return new this.constructor(this.bitfield | total);
        this.bitfield |= total;
        return this;
    }
    remove(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve(bit);
        }
        if (Object.isFrozen(this))
            return new this.constructor(this.bitfield & ~total);
        this.bitfield &= ~total;
        return this;
    }
    serialize() {
        const serialized = {};
        for (const [flag, bit] of Object.entries(this.constructor.FLAGS))
            serialized[flag] = this.has(bit);
        return serialized;
    }
    toArray() {
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
            return bit.map(p => this.resolve(p)).reduce((prev, p) => prev | p, BigInt(0));
        if (typeof bit === "string" && typeof this.FLAGS[bit] !== "undefined")
            return this.FLAGS[bit];
        const error = new RangeError("BITFIELD_INVALID");
        throw error;
    }
}
BitField.default = BitField;
module.exports = BitField;
