"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseGuild_1 = __importDefault(require("./BaseGuild"));
const Constants_1 = require("../util/Constants");
/**
 * Bundles common attributes and methods between {@link Guild} and {@link InviteGuild}
 * @abstract
 */
class AnonymousGuild extends BaseGuild_1.default {
    constructor(client, data) {
        super(client, data);
        this._patch(data);
    }
    _patch(data) {
        this.features = data.features;
        this.splash = data.splash;
        this.banner = data.banner;
        this.description = data.description;
        this.verificationLevel = Constants_1.VerificationLevels[data.verification_level];
        this.vanityURLCode = data.vanity_url_code;
        if ("nsfw_level" in data) {
            this.nsfwLevel = Constants_1.NSFWLevels[data.nsfw_level];
        }
    }
    bannerURL(options = {}) {
        if (!this.banner)
            return null;
        return this.client.rest.cdn.Banner(this.id, this.banner, options.format, options.size);
    }
    splashURL(options = {}) {
        if (!this.splash)
            return null;
        return this.client.rest.cdn.Splash(this.id, this.splash, options.format, options.size);
    }
}
module.exports = AnonymousGuild;
