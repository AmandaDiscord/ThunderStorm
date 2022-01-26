"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AC = require("@augu/collections");
const Util_1 = __importDefault(require("./Util"));
const BaseCollection = AC.Collection;
// @ts-ignore Realistically, keys *could* be anything and not just a string | number | symbol
class Collection extends BaseCollection {
    constructor(from) {
        super(from);
    }
    // Added to support Discord.js Collections.
    get _array() {
        return this.array();
    }
    get _keyArray() {
        return this.keyArray();
    }
    keyArray() {
        return this.toKeyArray();
    }
    array() {
        return this.toArray();
    }
    randomKey(amount) {
        let arr = this.keyArray();
        if (typeof amount === "undefined")
            return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount)
            return [];
        arr = arr.slice();
        return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    findKey(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return key;
        }
        return null;
    }
    sweep(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        const previousSize = this.size;
        for (const [key, val] of this) {
            if (fn(val, key, this))
                this.delete(key);
        }
        return previousSize - this.size;
    }
    flatMap(fn, thisArg) {
        const collections = this.map(fn, thisArg);
        return new this.constructor[Symbol.species]().concat(...collections);
    }
    mapValues(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        const coll = new this.constructor[Symbol.species]();
        for (const [key, val] of this)
            coll.set(key, fn(val, key, this));
        return coll;
    }
    every(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (!fn(val, key, this))
                return false;
        }
        return true;
    }
    some(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return true;
        }
        return false;
    }
    reduce(fn, initialValue) {
        let accumulator;
        if (typeof initialValue !== "undefined") {
            accumulator = initialValue;
            for (const [key, val] of this)
                accumulator = fn(accumulator, val, key, this);
            return accumulator;
        }
        let first = true;
        for (const [key, val] of this) {
            if (first) {
                accumulator = val;
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
    each(fn, thisArg) {
        this.forEach(fn, thisArg);
        return this;
    }
    tap(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        fn(this);
        return this;
    }
    clone() {
        return new this.constructor[Symbol.species](this.map((val, key) => [key, val]));
    }
    concat(...collections) {
        const newColl = this.clone();
        for (const coll of collections) {
            for (const [key, val] of coll)
                newColl.set(key, val);
        }
        return newColl;
    }
    equals(collection) {
        if (!collection)
            return false;
        if (this === collection)
            return true;
        if (this.size !== collection.size)
            return false;
        for (const [key, value] of this) {
            if (!collection.has(key) || value !== collection.get(key)) {
                return false;
            }
        }
        return true;
    }
    intersect(other) {
        return other.filter((_, k) => this.has(k));
    }
    difference(other) {
        return other.filter((_, k) => !this.has(k)).concat(this.filter((_, k) => !other.has(k)));
    }
    sorted(compareFunction = (x, y) => Number(x > y) || Number(x === y) - 1) {
        return new this.constructor[Symbol.species]([...this.entries()])
            .sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
    }
    partition(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        const results = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (const [key, val] of this) {
            if (fn(val, key, this)) {
                results[0].set(key, val);
            }
            else {
                results[1].set(key, val);
            }
        }
        return results;
    }
    toJSON() {
        return this.map(e => { var _a; return (typeof ((_a = e) === null || _a === void 0 ? void 0 : _a.toJSON) === "function" ? e.toJSON() : Util_1.default.flatten(e)); });
    }
    get length() {
        return this.size;
    }
    // @ts-ignore
    find(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return val;
        }
        return undefined;
    }
    // @ts-ignore
    filter(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        const results = new this.constructor[Symbol.species]();
        for (const [key, val] of this) {
            if (fn(val, key, this))
                results.set(key, val);
        }
        return results;
    }
    // @ts-ignore
    map(fn, thisArg) {
        if (typeof thisArg !== "undefined")
            fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, () => {
            const [key, value] = iter.next().value;
            return fn(value, key, this);
        });
    }
    // @ts-ignore
    sort(compareFunction = (x, y) => Number(x > y) || Number(x === y) - 1) {
        const entries = [...this.entries()];
        entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));
        super.clear();
        // Set the new entries
        for (const [k, v] of entries) {
            this.set(k, v);
        }
        return this;
    }
    forEach(callbackfn, thisArg) {
        // @ts-ignore
        return super.forEach(callbackfn, thisArg);
    }
    // @ts-ignore
    static from(values) {
        const collection = new Collection();
        if (Array.isArray(values) && values.every(item => Array.isArray(item) && item.length === 2)) {
            for (const [key, val] of values) {
                collection.set(key, val);
            }
        }
        else if (Array.isArray(values)) {
            // @ts-ignore
            for (let i = 0; i < values.length; i++)
                collection.set(i, values[i]);
        }
        else if (typeof values === "object" && values !== null) {
            // @ts-ignore
            for (const [key, value] of Object.entries(values))
                collection.set(key, value);
        }
        else {
            throw new TypeError(`Collection#from requires the values to be an Object or Array, received ${typeof values}`);
        }
        return collection;
    }
}
Symbol.iterator, Symbol.species;
Collection.default = Collection;
module.exports = Collection;
