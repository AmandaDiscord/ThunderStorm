"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __importDefault(require("events"));
const RESTManager_1 = __importDefault(require("../rest/RESTManager"));
const Util_1 = __importDefault(require("../util/Util"));
class BaseClient extends events_1.default {
    constructor(options) {
        super();
        this.accessToken = null;
        this._timeouts = new Set();
        this._intervals = new Set();
        this._immediates = new Set();
        this.options = options;
        this.rest = new RESTManager_1.default(this, "Bot");
        this._snow = options.snowtransfer;
        // eslint-disable-next-line no-useless-escape
        const match = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/); // ok bro
        if (match)
            this.token = match[1];
        else
            this.token = options.snowtransfer.token;
    }
    get api() {
        return this.rest.api;
    }
    destroy() {
        for (const t of this._timeouts)
            this.clearTimeout(t);
        for (const i of this._intervals)
            this.clearInterval(i);
        for (const i of this._immediates)
            this.clearImmediate(i);
        this._timeouts.clear();
        this._intervals.clear();
        this._immediates.clear();
    }
    setTimeout(fn, delay, ...args) {
        const timeout = setTimeout(() => {
            fn(...args);
            this._timeouts.delete(timeout);
        }, delay);
        this._timeouts.add(timeout);
        return timeout;
    }
    clearTimeout(timeout) {
        clearTimeout(timeout);
        this._timeouts.delete(timeout);
    }
    setInterval(fn, delay, ...args) {
        const interval = setInterval(fn, delay, ...args);
        this._intervals.add(interval);
        return interval;
    }
    clearInterval(interval) {
        clearInterval(interval);
        this._intervals.delete(interval);
    }
    setImmediate(fn, ...args) {
        const immediate = setImmediate(fn, ...args);
        this._immediates.add(immediate);
        return immediate;
    }
    clearImmediate(immediate) {
        clearImmediate(immediate);
        this._immediates.delete(immediate);
    }
    incrementMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners + 1);
        }
    }
    decrementMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners - 1);
        }
    }
    toJSON(...props) {
        return Util_1.default.flatten(this, { domain: false }, ...props);
    }
}
module.exports = BaseClient;
