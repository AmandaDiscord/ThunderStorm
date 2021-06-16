"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("snowtransfer/dist/src/Endpoints"));
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class Sticker extends Base_1.default {
    constructor(client, sticker) {
        var _a, _b, _c, _d, _e;
        super(client);
        const User = require("./User");
        this.id = sticker.id;
        this.asset = sticker.asset;
        this.description = sticker.description;
        this.format = Constants_1.StickerFormatTypes[sticker.format_type];
        this.name = sticker.name;
        this.packID = sticker.pack_id || null;
        this.tags = (_b = (_a = sticker.tags) === null || _a === void 0 ? void 0 : _a.split(", "), (_b !== null && _b !== void 0 ? _b : []));
        // @ts-ignore
        this.type = Constants_1.StickerTypes[sticker.type];
        // @ts-ignore
        this.available = (_c = sticker.available, (_c !== null && _c !== void 0 ? _c : null));
        // @ts-ignore
        this.guildID = (_d = sticker.guild_id, (_d !== null && _d !== void 0 ? _d : null));
        // @ts-ignore
        this.user = sticker.user ? new User(this.client, sticker.user) : null;
        // @ts-ignore
        this.sortValue = (_e = sticker.sort_value, (_e !== null && _e !== void 0 ? _e : null));
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get url() {
        return `${Endpoints_1.default.CDN_URL}/stickers/${this.id}.${this.format === "LOTTIE" ? "json" : "png"}`;
    }
}
module.exports = Sticker;
