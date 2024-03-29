"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class ThreadMetaData {
    constructor(thread, data) {
        this.locked = false;
        this.autoArchiveDuration = 60;
        this.archiver = null;
        this._archived = false;
        this.client = thread.client;
        this.thread = thread;
        if (data)
            this._patch(data);
    }
    get archived() {
        if (this._archived || this.archiver)
            return true;
        if (this.thread.lastMessageId && this.autoArchiveDuration !== 0) {
            const lastSendTimestamp = SnowflakeUtil_1.default.deconstruct(this.thread.lastMessageId).timestamp;
            if (Date.now() >= lastSendTimestamp + (this.autoArchiveDuration * 1000 * 60))
                return true;
        }
        if (this.archiveStatusChangedTimestamp && this.autoArchiveDuration && Date.now() > this.archiveStatusChangedTimestamp + (this.autoArchiveDuration * 1000 * 60))
            return true;
        return false;
    }
    toJSON() {
        const value = {
            locked: this.locked,
            auto_archive_duration: this.autoArchiveDuration,
            archived: this.archived,
            archive_timestamp: this.archiveStatusChangedAt.toISOString()
        };
        if (this.archiver)
            value["archiver_id"] = this.archiver.id;
        return value;
    }
    _patch(data) {
        const PartialUser = require("./Partial/PartialUser");
        if (data) {
            if (data.locked !== undefined)
                this.locked = data.locked;
            if (data.auto_archive_duration !== undefined)
                this.autoArchiveDuration = data.auto_archive_duration;
            if (data.archived !== undefined)
                this._archived = data.archived;
            if (data.archiver_id !== undefined)
                this.archiver = data.archiver_id !== null ? new PartialUser(this.client, { id: data.archiver_id }) : null;
            if (data.archive_timestamp !== undefined) {
                this.archiveStatusChangedAt = new Date(data.archive_timestamp);
                this.archiveStatusChangedTimestamp = this.archiveStatusChangedAt.getTime();
            }
        }
    }
}
ThreadMetaData.default = ThreadMetaData;
module.exports = ThreadMetaData;
