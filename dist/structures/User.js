"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const Constants_1 = __importDefault(require("../Constants"));
const Util_1 = require("./Util/Util");
class User {
    constructor(data, client) {
        this.client = client;
        this.partial = false;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.bot = data.bot || false;
        this.id = data.id;
        this.avatar = data.avatar || null;
        this.flags = data.public_flags || 0;
        this.system = data.system || false;
    }
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    get defaultAvatarURL() {
        return `${Constants_1.default.BASE_CDN_URL}/embed/avatars/${Number(this.discriminator) % 5}.png`;
    }
    get createdTimestamp() {
        return Util_1.SnowflakeUtil.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    toString() {
        return `<@${this.id}>`;
    }
    toJSON() {
        return {
            username: this.username,
            discriminator: this.discriminator,
            bot: this.bot,
            id: this.id,
            avatar: this.avatar,
            public_flags: this.flags
        };
    }
    avatarURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.avatar)
            return null;
        const format = this.avatar.startsWith("a_") && options.dynamic ? "gif" : options.format;
        return `${Constants_1.default.BASE_CDN_URL}/avatars/${this.id}/${this.avatar}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
    }
    displayAvatarURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.avatar)
            return this.defaultAvatarURL;
        else
            return this.avatarURL(options);
    }
    fetch() {
        return Promise.resolve(this);
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
}
module.exports = User;
