"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Util_1 = __importDefault(require("../util/Util"));
class Base {
    constructor(client) {
        this.client = client;
    }
    _clone() {
        return Object.assign(Object.create(this), this);
    }
    _patch(data) {
        return data;
    }
    _update(data) {
        const clone = this._clone();
        this._patch(data);
        return clone;
    }
    toJSON(...props) {
        return Util_1.default.flatten(this, ...props);
    }
    valueOf() {
        return this.id;
    }
}
Base.default = Base;
module.exports = Base;
