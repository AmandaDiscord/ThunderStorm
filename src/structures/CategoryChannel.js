"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class CategoryChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.type = "category";
    }
    toJSON() {
        return Object.assign(super.toJSON(), { type: 4, nsfw: this.nsfw });
    }
    _patch(data) {
        if (data.nsfw)
            this.nsfw = data.nsfw || false;
        super._patch(data);
    }
}
module.exports = CategoryChannel;