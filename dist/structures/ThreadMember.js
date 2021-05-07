"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
class ThreadMember extends Base_1.default {
    constructor(thread, data) {
        super({ id: data.user_id }, thread.client);
        this.flags = 0;
        this.thread = thread;
        const PartialUser = require("./Partial/PartialUser");
        if (data.flags !== undefined)
            this.flags = data.flags;
        if (!this.threadID || data.id)
            this.threadID = data.id || this.thread.id;
        if (data.join_timestamp) {
            this.joinedAt = new Date(data.join_timestamp);
            this.joinedTimestamp = this.joinedAt.getTime();
        }
        if (data.user_id)
            this.user = new PartialUser({ id: data.user_id }, this.client);
    }
    toJSON() {
        return {
            flags: this.flags,
            id: this.threadID,
            join_timestamp: this.joinedAt.toISOString(),
            user_id: this.user.id
        };
    }
    _patch(data) {
        const PartialUser = require("./Partial/PartialUser");
        if (data.flags !== undefined)
            this.flags = data.flags;
        if (!this.threadID || data.id)
            this.threadID = data.id || this.thread.id;
        if (data.join_timestamp) {
            this.joinedAt = new Date(data.join_timestamp);
            this.joinedTimestamp = this.joinedAt.getTime();
        }
        if (data.user_id)
            this.user = new PartialUser({ id: data.user_id }, this.client);
    }
}
module.exports = ThreadMember;
