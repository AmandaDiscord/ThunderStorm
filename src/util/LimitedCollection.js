"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
const Constants_js_1 = require("./Constants.js");
const DJSError_js_1 = require("../errors/DJSError.js");
// @ts-ignore
class LimitedCollection extends collection_1.Collection {
    constructor(options = {}, iterable) {
        if (typeof options !== "object" || options === null) {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "options", "object", true);
        }
        const { maxSize = Infinity, keepOverLimit = null, sweepInterval = 0, sweepFilter = null } = options;
        if (typeof maxSize !== "number") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "maxSize", "number");
        }
        if (keepOverLimit !== null && typeof keepOverLimit !== "function") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "keepOverLimit", "function");
        }
        if (typeof sweepInterval !== "number") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "sweepInterval", "number");
        }
        if (sweepFilter !== null && typeof sweepFilter !== "function") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "sweepFilter", "function");
        }
        super(iterable);
        this.maxSize = maxSize;
        this.keepOverLimit = keepOverLimit;
        this.sweepFilter = sweepFilter;
        this.interval =
            sweepInterval > 0 && sweepInterval !== Infinity && sweepFilter
                ? setInterval(() => {
                    const sweepFn = this.sweepFilter(this);
                    if (sweepFn === null)
                        return;
                    if (typeof sweepFn !== "function")
                        throw new DJSError_js_1.TypeError("SWEEP_FILTER_RETURN");
                    this.sweep(sweepFn);
                }, sweepInterval * 1000).unref()
                : null;
    }
    set(key, value) {
        var _a, _b;
        if (this.maxSize === 0)
            return this;
        if (this.size >= this.maxSize && !this.has(key)) {
            for (const [k, v] of this.entries()) {
                const keep = (_b = (_a = this.keepOverLimit) === null || _a === void 0 ? void 0 : _a.call(this, v, k, this)) !== null && _b !== void 0 ? _b : false;
                if (!keep) {
                    this.delete(k);
                    break;
                }
            }
        }
        return super.set(key, value);
    }
    static filterByLifetime({ lifetime = 14400, getComparisonTimestamp = e => { var _a; return ((_a = e) === null || _a === void 0 ? void 0 : _a.createdTimestamp) || 0; }, excludeFromSweep = () => false } = {}) {
        if (typeof lifetime !== "number") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "lifetime", "number");
        }
        if (typeof getComparisonTimestamp !== "function") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "getComparisonTimestamp", "function");
        }
        if (typeof excludeFromSweep !== "function") {
            throw new DJSError_js_1.TypeError("INVALID_TYPE", "excludeFromSweep", "function");
        }
        return () => {
            if (lifetime <= 0)
                return null;
            const lifetimeMs = lifetime * 1000;
            const now = Date.now();
            return (entry, key, coll) => {
                if (excludeFromSweep(entry, key, coll)) {
                    return false;
                }
                const comparisonTimestamp = getComparisonTimestamp(entry, key, coll);
                if (!comparisonTimestamp || typeof comparisonTimestamp !== "number")
                    return false;
                return now - comparisonTimestamp > lifetimeMs;
            };
        };
    }
    [Constants_js_1._cleanupSymbol]() {
        return this.interval ? () => clearInterval(this.interval) : null;
    }
    static get [Symbol.species]() {
        return collection_1.Collection;
    }
}
LimitedCollection.default = LimitedCollection;
module.exports = LimitedCollection;
