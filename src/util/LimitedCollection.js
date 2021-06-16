"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_js_1 = __importDefault(require("./Collection.js"));
// @ts-ignore
class LimitedCollection extends Collection_js_1.default {
    constructor(maxSize = 0, iterable = null) {
        super(iterable);
        this.maxSize = maxSize;
    }
    set(key, value) {
        if (this.maxSize === 0)
            return this;
        if (this.size >= this.maxSize && !this.has(key))
            this.delete(this.firstKey());
        return super.set(key, value);
    }
    static get [Symbol.species]() {
        return Collection_js_1.default;
    }
}
module.exports = LimitedCollection;
