"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class CategoryChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.type = "category";
        this.nsfw = data.nsfw || false;
    }
    toJSON() {
        return {
            type: 4,
            nsfw: this.nsfw,
            ...super.toJSON()
        };
    }
}
module.exports = CategoryChannel;
