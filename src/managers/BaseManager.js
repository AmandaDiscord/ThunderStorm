"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("../util/Collection"));
class BaseManager {
    constructor(client, iterable, holds, cacheType = Collection_1.default, ...cacheOptions) {
        this.holds = holds;
        this.client = client;
        this.cacheType = cacheType;
        this.cache = new cacheType(...cacheOptions);
        if (iterable)
            for (const i of iterable)
                this._add(i);
    }
    _add(data, cache = true, options = { extras: [] }) {
        // @ts-ignore
        const existing = this.cache.get(options.id || data.id);
        // @ts-ignore
        if (existing && existing._patch && cache)
            existing._patch(data);
        if (existing)
            return existing;
        const entry = this.holds ? new this.holds(this.client, data, ...options.extras || []) : data;
        // @ts-ignore
        if (cache)
            this.cache.set(options.id || entry.id, entry);
        return entry;
    }
    resolve(idOrInstance) {
        if (idOrInstance instanceof this.holds)
            return idOrInstance;
        if (typeof idOrInstance === "string")
            return this.cache.get(idOrInstance) || null;
        return null;
    }
    resolveID(idOrInstance) {
        // @ts-ignore
        if (idOrInstance instanceof this.holds)
            return idOrInstance.id;
        if (typeof idOrInstance === "string")
            return idOrInstance;
        return null;
    }
    valueOf() {
        return this.cache;
    }
}
module.exports = BaseManager;
