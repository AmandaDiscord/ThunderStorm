"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
class Channel extends Base_1.default {
    constructor(data, client) {
        super(data, client);
        this.partial = false;
        this.type = "unknown";
        if (data.name)
            this.name = data.name;
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
    _patch(data) {
        if (data.name)
            this.name = data.name;
        super._patch(data);
    }
}
module.exports = Channel;
