"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextChannel_1 = __importDefault(require("./TextChannel"));
class NewsChannel extends TextChannel_1.default {
    constructor(data, client) {
        // @ts-ignore
        super(data, client);
        // @ts-ignore
        this.type = "news";
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), { type: 5 });
    }
}
module.exports = NewsChannel;
