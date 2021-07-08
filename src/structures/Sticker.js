"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class Sticker extends Base_1.default {
    constructor(client, sticker) {
        super(client);
        this.id = sticker.id;
        this.format = Constants_1.StickerFormatTypes[sticker.format_type];
        this.name = sticker.name;
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
