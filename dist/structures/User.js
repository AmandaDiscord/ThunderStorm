"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const Base_1 = __importDefault(require("./Base"));
const UserFlags_1 = __importDefault(require("./UserFlags"));
class User extends Base_1.default {
    constructor(data, client) {
        super(data, client);
        this.partial = false;
        this._patch(data);
    }
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    get defaultAvatarURL() {
        return `${Constants_1.default.BASE_CDN_URL}/embed/avatars/${Number(this.discriminator) % 5}.png`;
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
            public_flags: Number(this.flags.bitfield)
        };
    }
    avatarURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.avatar)
            return null;
        const format = this.avatar.startsWith("a_") && options.dynamic ? "gif" : (options.format || "png");
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
    _patch(data) {
        if (data.username)
            this.username = data.username;
        if (data.discriminator)
            this.discriminator = data.discriminator;
        if (!this.bot || data.bot !== undefined)
            this.bot = data.bot || false;
        if (data.id)
            this.id = data.id;
        if (!this.avatar)
            this.avatar = data.avatar || null;
        if (!this.flags || data.public_flags)
            this.flags = new UserFlags_1.default(data.public_flags || 0).freeze();
        if (!this.system || data.system !== undefined)
            this.system = data.system || false;
    }
}
module.exports = User;
