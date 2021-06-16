"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const GuildPreviewEmoji_1 = __importDefault(require("./GuildPreviewEmoji"));
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildPreview extends Base_1.default {
    constructor(client, data) {
        super(client);
        if (data)
            this._patch(data);
    }
    _patch(data) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.features = data.features;
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.description = data.description || null;
        if (!this.emojis) {
            this.emojis = new Collection_1.default();
        }
        else {
            this.emojis.clear();
        }
        for (const emoji of data.emojis) {
            this.emojis.set(emoji.id, new GuildPreviewEmoji_1.default(this.client, emoji, this));
        }
    }
    splashURL(options = {}) {
        if (!this.splash)
            return null;
        return this.client.rest.cdn.Splash(this.id, this.splash, options.format, options.size);
    }
    discoverySplashURL(options = {}) {
        if (!this.discoverySplash)
            return null;
        return this.client.rest.cdn.DiscoverySplash(this.id, this.discoverySplash, options.format, options.size);
    }
    iconURL(options = {}) {
        if (!this.icon)
            return null;
        return this.client.rest.cdn.Icon(this.id, this.icon, options.format, options.size, options.dynamic);
    }
    async fetch() {
        const data = await this.client._snow.guild.getGuildPreview(this.id);
        this._patch(data);
        return this;
    }
    toString() {
        return this.name;
    }
    toJSON() {
        const json = super.toJSON();
        json.iconURL = this.iconURL();
        json.splashURL = this.splashURL();
        return json;
    }
}
module.exports = GuildPreview;
