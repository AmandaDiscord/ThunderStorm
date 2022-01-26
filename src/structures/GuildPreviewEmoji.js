"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseGuildEmoji_1 = __importDefault(require("./BaseGuildEmoji"));
class GuildPreviewEmoji extends BaseGuildEmoji_1.default {
    get roles() {
        return new Set(this._roles);
    }
}
GuildPreviewEmoji.default = GuildPreviewEmoji;
module.exports = GuildPreviewEmoji;
