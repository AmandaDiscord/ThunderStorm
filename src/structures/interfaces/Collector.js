"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __importDefault(require("events"));
const errors_1 = require("../../errors");
const Collection_1 = __importDefault(require("../../util/Collection"));
const Util_1 = __importDefault(require("../../util/Util"));
class Collector extends events_1.default {
    constructor(client, filter, options = {}) {
        super();
        this.collected = new Collection_1.default();
        this.ended = false;
        this._timeout = null;
        this._idletimeout = null;
        this.client = client;
        this.filter = filter;
        this.options = options;
        if (typeof filter !== "function") {
            throw new errors_1.TypeError("INVALID_TYPE", "filter", "function");
        }
        this.handleCollect = this.handleCollect.bind(this);
        this.handleDispose = this.handleDispose.bind(this);
        if (options.time)
            this._timeout = this.client.setTimeout(() => this.stop("time"), options.time);
        if (options.idle)
            this._idletimeout = this.client.setTimeout(() => this.stop("idle"), options.idle);
    }
    async handleCollect(...args) {
        const collect = this.collect(...args);
        // @ts-ignore
        if (collect && (await this.filter(...args, this.collected))) {
            this.collected.set(collect, args[0]);
            this.emit("collect", ...args);
            if (this._idletimeout) {
                this.client.clearTimeout(this._idletimeout);
                this._idletimeout = this.client.setTimeout(() => this.stop("idle"), this.options.idle);
            }
        }
        this.checkEnd();
    }
    handleDispose(...args) {
        if (!this.options.dispose)
            return;
        const dispose = this.dispose(...args);
        // @ts-ignore
        if (!dispose || !this.filter(...args) || !this.collected.has(dispose))
            return;
        this.collected.delete(dispose);
        this.emit("dispose", ...args);
        this.checkEnd();
    }
    get next() {
        return new Promise((resolve, reject) => {
            if (this.ended) {
                reject(this.collected);
                return;
            }
            const cleanup = () => {
                this.removeListener("collect", onCollect);
                this.removeListener("end", onEnd);
            };
            const onCollect = (item) => {
                cleanup();
                resolve(item);
            };
            const onEnd = () => {
                cleanup();
                reject(this.collected);
            };
            this.on("collect", onCollect);
            this.on("end", onEnd);
        });
    }
    stop(reason = "user") {
        if (this.ended)
            return;
        if (this._timeout) {
            this.client.clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._idletimeout) {
            this.client.clearTimeout(this._idletimeout);
            this._idletimeout = null;
        }
        this.ended = true;
        this.emit("end", this.collected, reason);
    }
    resetTimer(options = {}) {
        if (this._timeout) {
            this.client.clearTimeout(this._timeout);
            this._timeout = this.client.setTimeout(() => this.stop("time"), options.time || this.options.time);
        }
        if (this._idletimeout) {
            this.client.clearTimeout(this._idletimeout);
            this._idletimeout = this.client.setTimeout(() => this.stop("idle"), options.idle || this.options.idle);
        }
    }
    checkEnd() {
        const reason = this.endReason;
        if (reason)
            this.stop(reason);
    }
    async *[Symbol.asyncIterator]() {
        const queue = [];
        const onCollect = (item) => queue.push(item);
        this.on("collect", onCollect);
        try {
            while (queue.length || !this.ended) {
                if (queue.length) {
                    yield queue.shift();
                }
                else {
                    await new Promise(resolve => {
                        const tick = () => {
                            this.removeListener("collect", tick);
                            this.removeListener("end", tick);
                            return resolve(undefined);
                        };
                        this.on("collect", tick);
                        this.on("end", tick);
                    });
                }
            }
        }
        finally {
            this.removeListener("collect", onCollect);
        }
    }
    toJSON() {
        return Util_1.default.flatten(this);
    }
}
module.exports = Collector;
