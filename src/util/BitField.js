"use strict";
class BitField {
    constructor(bits) {
        this.FLAGS = {};
        this.bitfield = BitField.resolve.call(this, bits);
    }
    any(bit) {
        return (this.bitfield & this.constructor.resolve.call(this, bit)) !== BigInt(0);
    }
    equals(bit) {
        return this.bitfield === this.constructor.resolve.call(this, bit);
    }
    has(bit) {
        if (Array.isArray(bit))
            return bit.every(p => this.has(p));
        bit = this.constructor.resolve.call(this, bit);
        return (this.bitfield & bit) === bit;
    }
    missing(bits) {
        return new this.constructor(bits).remove(this).toArray();
    }
    freeze() {
        return Object.freeze(this);
    }
    add(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve.call(this, bit);
        }
        if (Object.isFrozen(this))
            return new this.constructor(this.bitfield | total);
        this.bitfield |= total;
        return this;
    }
    remove(...bits) {
        let total = BigInt(0);
        for (const bit of bits) {
            total |= this.constructor.resolve.call(this, bit);
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
    *[(Symbol.species, Symbol.iterator)]() {
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
