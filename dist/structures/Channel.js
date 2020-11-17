"use strict";
const Util_1 = require("./Util/Util");
class Channel {
    constructor(data, client) {
        this.client = client;
        this.partial = false;
        this.id = data.id;
        this.name = data.name;
        this.type = "unknown";
    }
    get createdTimestamp() {
        return Util_1.SnowflakeUtil.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    fetch() {
        return Promise.resolve(this);
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.id
        };
    }
}
module.exports = Channel;
