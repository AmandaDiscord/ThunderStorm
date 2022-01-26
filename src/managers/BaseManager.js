"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
class BaseManager {
    // @ts-ignore
    constructor(client, iterable, holds, cacheType = collection_1.Collection, ...cacheOptions) {
        this.holds = holds;
        this.client = client;
        this.cacheType = cacheType;
        // @ts-ignore
        this.cache = new cacheType(...cacheOptions);
        if (iterable)
            for (const i of iterable)
                this._add(i);
    }
    _add(data, cache = true, options = { extras: [] }) {
        const existing = this.cache.get(options.id || data.id);
        if (existing && existing._patch && cache)
            existing._patch(data);
        if (existing)
            return existing;
        const entry = this.holds ? new this.holds(this.client, data, ...options.extras || []) : data;
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
    resolveId(idOrInstance) {
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
BaseManager.default = BaseManager;
module.exports = BaseManager;
