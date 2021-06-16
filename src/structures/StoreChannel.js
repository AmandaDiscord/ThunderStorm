"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class StoreChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.type = "store";
        this.nsfw = Boolean(data.nsfw);
    }
    _patch(data) {
        super._patch(data);
        if ("nsfw" in data) {
            this.nsfw = Boolean(data.nsfw);
        }
    }
}
module.exports = StoreChannel;
