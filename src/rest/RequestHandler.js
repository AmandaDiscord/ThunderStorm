"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
class RequestHandler {
    constructor(manager) {
        this.reset = -1;
        this.remaining = -1;
        this.limit = -1;
        this.manager = manager;
        this.queue = {};
        this.reset = -1;
        this.remaining = -1;
        this.limit = -1;
    }
    push(request) {
        return this.execute(request);
    }
    get globalLimited() {
        return this.manager.globalRemaining <= 0 && Date.now() < this.manager.globalReset;
    }
    get localLimited() {
        return this.remaining <= 0 && Date.now() < this.reset;
    }
    get limited() {
        return this.globalLimited || this.localLimited;
    }
    get _inactive() {
        return this.queue.remaining === 0 && !this.limited;
    }
    globalDelayFor(ms) {
        return new Promise(resolve => {
            this.manager.client.setTimeout(() => {
                this.manager.globalDelay = null;
                resolve(undefined);
            }, ms);
        });
    }
    execute(request) {
        // As the request goes out, update the global usage information
        if (!this.manager.globalReset || this.manager.globalReset < Date.now()) {
            this.manager.globalReset = Date.now() + 1000;
            this.manager.globalRemaining = this.manager.globalLimit;
        }
        this.manager.globalRemaining--;
        return request.make();
    }
}
RequestHandler.default = RequestHandler;
module.exports = RequestHandler;
