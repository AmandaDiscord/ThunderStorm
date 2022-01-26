"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Base_1 = __importDefault(require("./Base"));
// @ts-ignore
class ThreadMember extends Base_1.default {
    constructor(thread, data) {
        super(thread.client);
        this.flags = 0;
        this.thread = thread;
        if (data)
            this._patch(data);
    }
    toJSON() {
        return {
            flags: this.flags,
            id: this.threadId,
            join_timestamp: this.joinedAt.toISOString(),
            user_id: this.user.id
        };
    }
    _patch(data) {
        const PartialUser = require("./Partial/PartialUser");
        if (data.flags !== undefined)
            this.flags = data.flags;
        if (!this.threadId || data.id)
            this.threadId = data.id || this.thread.id;
        if (data.join_timestamp) {
            this.joinedAt = new Date(data.join_timestamp);
            this.joinedTimestamp = this.joinedAt.getTime();
        }
        if (data.user_id) {
            this.user = new PartialUser(this.client, { id: data.user_id });
            this.id = this.user.id;
        }
    }
}
ThreadMember.default = ThreadMember;
module.exports = ThreadMember;
